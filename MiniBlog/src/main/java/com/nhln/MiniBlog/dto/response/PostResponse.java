package com.nhln.MiniBlog.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    Long id;
    String title;
    String content;
    Long userId;
    String imageUrl;
    LocalDateTime createdDate;
    LocalDateTime updatedDate;
}
