package com.nhln.MiniBlog.repository;

import com.nhln.MiniBlog.pojo.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post,Long>, JpaSpecificationExecutor<Post> {
}
