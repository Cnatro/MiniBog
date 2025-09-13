package com.nhln.MiniBlog.service.impl;

import com.nhln.MiniBlog.dto.filter.PostFilter;
import com.nhln.MiniBlog.dto.request.PostCreateDto;
import com.nhln.MiniBlog.dto.response.PageResponseDto;
import com.nhln.MiniBlog.dto.response.PostResponse;
import com.nhln.MiniBlog.mapper.PostMapper;
import com.nhln.MiniBlog.pojo.Post;
import com.nhln.MiniBlog.repository.PostRepository;
import com.nhln.MiniBlog.security.UserPrincipal;
import com.nhln.MiniBlog.service.PostService;
import com.nhln.MiniBlog.specifications.PostSpecification;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {
    PostRepository postRepository;
    PostMapper postMapper;

    private boolean isCanModifyPost(UserPrincipal userPrincipal, Post post) {
        return !"ROLE_ADMIN".equals(userPrincipal.getRoleName()) &&
                !Objects.equals(userPrincipal.getId(), post.getUser().getId());
    }

    private Specification<Post> buildSpecificationWithFilter(PostFilter postFilter) {
        return PostSpecification.hasNameLike(postFilter.getKeyword())
                .and(PostSpecification.hasNameUser(postFilter.getUsername()));
    }

    @Override
    public PostResponse persistPost(PostCreateDto postCreateDto) {
        Post post = this.postMapper.toEntity(postCreateDto);
        return this.postMapper.toDto(this.postRepository.save(post));
    }

    @Override
    public PostResponse updatePost(UserPrincipal userLogin, PostCreateDto postCreateDto, Long id) throws AccessDeniedException {
        Post postExit = this.postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found: " + id));

        if (isCanModifyPost(userLogin, postExit)) {
            throw new AccessDeniedException("You do not have permission to edit this post.");
        }

        this.postMapper.updatePost(postCreateDto, postExit);
        return this.postMapper.toDto(this.postRepository.save(postExit));
    }

    @Override
    public PostResponse getPostById(Long id) {
        Post postExit = this.postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found: " + id));

        return this.postMapper.toDto(postExit);
    }

    @Override
    public void deletePost(UserPrincipal userLogin, Long id) throws AccessDeniedException {

        Post postExit = this.postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found: " + id));
        if (isCanModifyPost(userLogin, postExit)) {
            throw new AccessDeniedException("You do not have permission to edit this post.");
        }

        this.postRepository.delete(postExit);
    }

    @Override
    public PageResponseDto<PostResponse> getPosts(Pageable pageable, PostFilter postFilter) {
        Specification<Post> specs = this.buildSpecificationWithFilter(postFilter);

        Page<Post> postPages = this.postRepository.findAll(specs, pageable);
        List<Post> posts = postPages.getContent();

        return new PageResponseDto<>(posts.stream().map(this.postMapper::toDto).collect(Collectors.toList()),
                postPages.getTotalElements());
    }

}
