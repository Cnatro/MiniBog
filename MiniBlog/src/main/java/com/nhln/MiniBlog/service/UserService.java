package com.nhln.MiniBlog.service;

import com.nhln.MiniBlog.dto.request.UserLoginDto;
import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserResponse persistUser(UserRegisterDto userDto);
    UserResponse getDetail(Long id);
    void deleteUser(Long id);
    Boolean verify(UserLoginDto userLoginDto);
}
