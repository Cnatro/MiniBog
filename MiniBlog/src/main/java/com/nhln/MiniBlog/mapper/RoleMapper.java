package com.nhln.MiniBlog.mapper;

import com.nhln.MiniBlog.dto.response.RoleResponse;
import com.nhln.MiniBlog.pojo.Role;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMapper {
    RoleResponse toDto(Role role);
}
