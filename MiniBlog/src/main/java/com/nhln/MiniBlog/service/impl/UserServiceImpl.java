package com.nhln.MiniBlog.service.impl;

import com.nhln.MiniBlog.dto.request.UserLoginDto;
import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import com.nhln.MiniBlog.mapper.UserMapper;
import com.nhln.MiniBlog.pojo.Permission;
import com.nhln.MiniBlog.pojo.Role;
import com.nhln.MiniBlog.pojo.User;
import com.nhln.MiniBlog.repository.UserRepository;
import com.nhln.MiniBlog.security.UserPrincipal;
import com.nhln.MiniBlog.service.RoleService;
import com.nhln.MiniBlog.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleService roleService;
    BCryptPasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;

    @Override
    public UserResponse persistUser(UserRegisterDto userDto) {
        Role userRole = roleService.getRoleEntityByName("ROLE_USER");

        User user = this.userMapper.toEntity(userDto);
        user.setRole(userRole);
        user.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
        return this.userMapper.toDto(this.userRepository.save(user));
    }

    @Override
    public UserResponse getDetail(Long id) {
        User userExist = this.userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        return this.userMapper.toDto(userExist);
    }

    @Override
    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public Boolean verify(UserLoginDto userLoginDto) {
        Authentication auth = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDto.getEmail(),
                        userLoginDto.getPassword()
                )
        );
        return auth.isAuthenticated();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found user by email: " + email));

        Set<GrantedAuthority> authorities = new HashSet<>();
        Set<Permission> permissions = user.getRole().getPermissions();

        permissions.forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getSlug())));
        return new UserPrincipal(user, authorities);
    }
}
