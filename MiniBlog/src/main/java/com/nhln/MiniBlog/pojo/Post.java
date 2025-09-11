package com.nhln.MiniBlog.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void prePersist(){
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedDate = LocalDateTime.now();
    }
}
