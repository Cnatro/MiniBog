package com.nhln.MiniBlog.service.impl;

import com.nhln.MiniBlog.dto.response.RoleResponse;
import com.nhln.MiniBlog.mapper.RoleMapper;
import com.nhln.MiniBlog.pojo.Role;
import com.nhln.MiniBlog.repository.RoleRepository;
import com.nhln.MiniBlog.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;

    @Override
    public Role getRoleEntityByName(String name) {
        return this.roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found: " + name));
    }
}
