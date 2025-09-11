package com.nhln.MiniBlog.specifications;

import com.nhln.MiniBlog.pojo.Post;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class PostSpecification {
    public static Specification<Post> hasNameLike(String kw) {
        return (root, query, cb) ->
                kw != null && !kw.trim().isEmpty() ?
                        cb.like(cb.lower(root.get("name")), "%" + kw.toLowerCase() + "%") : cb.conjunction();
    }

    public static Specification<Post> hasNameUser(String username) {
        return (root, query, cb) ->
                username != null && !username.trim().isEmpty() ?
                        cb.like(cb.lower(root.get("user").get("username")), "%" + username.toLowerCase() + "%") : cb.conjunction();

    }
}
