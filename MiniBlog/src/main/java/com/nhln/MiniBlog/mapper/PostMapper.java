package com.nhln.MiniBlog.mapper;

import com.nhln.MiniBlog.dto.request.PostCreateDto;
import com.nhln.MiniBlog.dto.response.PostResponse;
import com.nhln.MiniBlog.pojo.Post;
import com.nhln.MiniBlog.pojo.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PostMapper {
    @Mapping(source = "userId", target = "user")
    Post toEntity(PostCreateDto postCreateDto);

    @Mapping(source = "user.id",target = "userId")
    PostResponse toDto(Post post);

    void updatePost(PostCreateDto postCreateDto, @MappingTarget Post post);

    default User mapUser(Long userId) {
        return userId == null ? null : User.builder().id(userId).build();
    }
}
