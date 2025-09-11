package com.nhln.MiniBlog.controller.auth;

//import com.nhln.MiniBlog.controller.base.ApiUserBaseController;
import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import com.nhln.MiniBlog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/users")
@RequiredArgsConstructor
public class ApiUserAuthController {
    UserService userService;

    @PreAuthorize("hasAuthority('user.add')")
    @PostMapping
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRegisterDto userRegisterDto) {
        UserResponse userDto = this.userService.persistUser(userRegisterDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }
}
