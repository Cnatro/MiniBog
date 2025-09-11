package com.nhln.MiniBlog.service;

import com.nhln.MiniBlog.dto.response.RoleResponse;
import com.nhln.MiniBlog.pojo.Role;

public interface RoleService {
    Role getRoleEntityByName(String name);
}
