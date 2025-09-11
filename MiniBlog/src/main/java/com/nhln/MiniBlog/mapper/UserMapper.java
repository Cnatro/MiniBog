package com.nhln.MiniBlog.mapper;

import com.nhln.MiniBlog.dto.request.UserRegisterDto;
import com.nhln.MiniBlog.dto.response.UserResponse;
import com.nhln.MiniBlog.pojo.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    User toEntity(UserRegisterDto userRegisterDto);

    @Mapping(source = "role.name", target = "roleName")
    UserResponse toDto(User user);
//    void updateUser
}
