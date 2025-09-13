/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getPosts } from "../../redux/actions/postActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../contants";
import type { Post } from "../../typeModule";
import { Box, Pagination } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { posts, isLoading, error } = useAppSelector((state) => state.posts);
  const itemsPerPage = 6;

  const params = new URLSearchParams(location.search);
  const pageFromUrl = Number(params.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    navigate(`?page=${page}`, { replace: false });
    dispatch(getPosts({ page, size: itemsPerPage }));
  }, [dispatch, page]);

  if (isLoading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  const postList = posts?.data || [];
  const totalPages = Math.ceil(posts.total / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MiniBlog</h1>
          <p className="hero-subtitle">
            Share your thoughts and connect with others
          </p>
        </div>
      </div>

      <div className="posts-container">
        {postList.length > 0 ? (
          <>
            <div className="posts-grid">
              {postList.map((post: Post) => (
                <article key={post.id} className="blog-post-card">
                  <div className="post-header">
                    <div className="author-info">
                      <div className="author-avatar">
                        <img
                          src={`https://ui-avatars.com/api/?name=${post.username}&background=6366f1&color=fff`}
                          alt={post.username}
                          className="avatar-img"
                        />
                      </div>
                      <div className="author-details">
                        <h3 className="author-name">
                          {user && user.id === post.userId ? "Bạn" : post.username}
                        </h3>
                        <time className="post-date">
                          {post.createdDate
                            ? new Date(post.createdDate).toLocaleDateString(
                                "vi-VN",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "2 hours ago"}
                        </time>
                      </div>
                    </div>
                  </div>

                  <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-excerpt">{post.content}</p>

                    {post.imageUrl && (
                      <div className="post-image-container">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="post-image"
                        />
                      </div>
                    )}
                  </div>

                  <div className="post-footer">
                    <div className="post-actions">
                      <button className="action-btn like-btn">Like</button>
                      <button className="action-btn comment-btn">
                        Comment
                      </button>
                      <button className="action-btn share-btn">Share</button>
                    </div>
                    <Link
                      to={`${ROUTE.POSTS}/${post.id}`}
                      className="read-more-link"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#4f46e5",
                    fontWeight: 500,
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#4f46e5",
                    color: "#fff",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#c7d2fe",
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No posts available</h3>
            <p>Be the first to share something!</p>
            <Link to={ROUTE.ADD_POST} className="create-post-btn">
              Create Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
