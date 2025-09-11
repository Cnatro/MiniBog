package com.nhln.MiniBlog.controller.public_;

//import com.nhln.MiniBlog.controller.base.ApiUserBaseController;
import com.nhln.MiniBlog.dto.request.UserLoginDto;
import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import com.nhln.MiniBlog.service.UserService;
import com.nhln.MiniBlog.utils.JwtUtil;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/public/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApiUserPublicController {
    UserService userService;
    JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRegisterDto userRegisterDto) {
        UserResponse userDto = this.userService.persistUser(userRegisterDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto userLoginDto) throws JOSEException {
        System.out.println(this.userService.verify(userLoginDto));
        if (this.userService.verify(userLoginDto)) {
            try {
                String token = this.jwtUtil.generateToke(userLoginDto.getEmail());
                return ResponseEntity.ok().body(Collections.singletonMap("token", token));
            } catch (JOSEException e) {
                return ResponseEntity.status(500).body("Error created Token");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect login");
    }
}
