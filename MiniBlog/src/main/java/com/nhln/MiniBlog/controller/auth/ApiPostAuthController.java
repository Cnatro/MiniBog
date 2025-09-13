package com.nhln.MiniBlog.controller.auth;

import com.nhln.MiniBlog.dto.request.PostCreateDto;
import com.nhln.MiniBlog.dto.response.PostResponse;
import com.nhln.MiniBlog.security.UserPrincipal;
import com.nhln.MiniBlog.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/auth/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApiPostAuthController {
    PostService postService;

    @PreAuthorize("hasAuthority('post.add')")
    @PostMapping
    public ResponseEntity<PostResponse> persistPost(@RequestBody PostCreateDto postCreateDto) {
        PostResponse response = this.postService.persistPost(postCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasAuthority('post.edit')")
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@RequestBody PostCreateDto postCreateDto,
                                                   @PathVariable Long id,
                                                   @AuthenticationPrincipal UserPrincipal userLogin) throws AccessDeniedException {
        PostResponse response = this.postService.updatePost(userLogin, postCreateDto, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasAuthority('post.detail')")
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getDetail(@PathVariable Long id) {
        PostResponse response = this.postService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasAuthority('post.delete')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id,
                                           @AuthenticationPrincipal UserPrincipal userLogin) throws AccessDeniedException {
        this.postService.deletePost(userLogin, id);
        return ResponseEntity.noContent().build();
    }
}
