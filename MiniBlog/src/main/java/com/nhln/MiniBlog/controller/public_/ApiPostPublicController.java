package com.nhln.MiniBlog.controller.public_;

import com.nhln.MiniBlog.dto.filter.PostFilter;
import com.nhln.MiniBlog.dto.request.PostCreateDto;
import com.nhln.MiniBlog.dto.response.PageResponseDto;
import com.nhln.MiniBlog.dto.response.PostResponse;
import com.nhln.MiniBlog.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApiPostPublicController {
    PostService postService;

    @GetMapping
    public ResponseEntity<PageResponseDto<PostResponse>> getPosts(Pageable pageable, @ModelAttribute PostFilter postFilter) {
        PageResponseDto<PostResponse> postData = this.postService.getPosts(pageable, postFilter);
        return ResponseEntity.status(HttpStatus.OK).body(postData);
    }


}
