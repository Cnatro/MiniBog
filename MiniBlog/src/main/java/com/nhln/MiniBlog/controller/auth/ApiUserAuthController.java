package com.nhln.MiniBlog.controller.auth;

import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import com.nhln.MiniBlog.security.UserPrincipal;
import com.nhln.MiniBlog.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApiUserAuthController {
    UserService userService;

    @PreAuthorize("hasAuthority('user.add')")
    @PostMapping
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRegisterDto userRegisterDto) {
        UserResponse userDto = this.userService.persistUser(userRegisterDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@NotNull @AuthenticationPrincipal UserPrincipal user) {
        UserResponse userResponse = this.userService.getDetail(user.getId());
        return ResponseEntity.ok(userResponse);
    }
}
