package com.nhln.MiniBlog.service;

import com.nhln.MiniBlog.dto.filter.PostFilter;
import com.nhln.MiniBlog.dto.request.PostCreateDto;
import com.nhln.MiniBlog.dto.response.PageResponseDto;
import com.nhln.MiniBlog.dto.response.PostResponse;
import com.nhln.MiniBlog.pojo.Post;
import com.nhln.MiniBlog.security.UserPrincipal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.nio.file.AccessDeniedException;

public interface PostService {
    PostResponse persistPost(PostCreateDto postCreateDto);
    PostResponse updatePost(UserPrincipal userLogin, PostCreateDto postCreateDto, Long id) throws AccessDeniedException;
    PostResponse getPostById(UserPrincipal userLogin,Long id) throws AccessDeniedException;
    void deletePost(UserPrincipal userLogin,Long id) throws AccessDeniedException;
    PageResponseDto<PostResponse> getPosts(Pageable pageable, PostFilter postFilter);
}
