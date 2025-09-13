/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import {
  SaveOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTE } from "../../contants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  deletePost,
  getPostById,
  updatePost,
} from "../../redux/actions/postActions";
import type { Post } from "../../typeModule";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title cannot exceed 200 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(50, "Content must be at least 50 characters")
    .required("Content is required"),
  // imgUrl: Yup.string()
  //   .url("Invalid image URL")
  //   .required("Image URL is required"),
});

interface ProductValues {
  title: string;
  content: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<ProductValues>({
    title: "",
    content: "",
  });
  const { postDetail, isLoading, error } = useAppSelector(
    (state) => state.posts
  );
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostById(Number(id)));
  }, [id]);

  useEffect(() => {
    if (postDetail) {
      setInitialValues({
        title: postDetail.title,
        content: postDetail.content,
      });
    }
  }, [postDetail]);

  if (isLoading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleUpdate = async (values: ProductValues) => {
    const postUpdate = {
      title: values.title,
      userId: Number(user.id),
      content: values.content,
    };

    dispatch(updatePost(postUpdate as Post, postDetail.id));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this post?")) {
      dispatch(deletePost(postDetail.id));
      navigate(ROUTE.HOME);
    }
  };

  const goBack = () => navigate(ROUTE.HOME);

  return (
    <div className="addpost-container">
      <div className="addpost-wrapper">
        {/* Header */}
        <div className="addpost-header">
          <button onClick={goBack} className="addpost-backbtn">
            <ArrowLeftOutlined className="mr-1" />
            Back
          </button>
          <h1 className="addpost-title">Product Detail</h1>
        </div>

        {/* Form */}
        <div className="addpost-formbox">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={PostSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <Form className="addpost-form">
                {/* Title */}
                <div className="addpost-form-group">
                  <label className="addpost-form-label">Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter post name..."
                    className="addpost-input"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="addpost-error"
                  />
                </div>

                {/* Content */}
                <div className="addpost-form-group">
                  <label className="addpost-form-label">Content</label>
                  <Field
                    name="content"
                    as="textarea"
                    rows={8}
                    placeholder="Enter post content..."
                    className="addpost-textarea"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="addpost-error"
                  />
                </div>

                {/* Action buttons */}
                {user.id == postDetail?.userId && (
                  <div className="addpost-submitbox">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`addpost-submitbtn ${
                        isSubmitting ? "disabled" : ""
                      }`}
                    >
                      <SaveOutlined className="mr-2" />
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="addpost-submitbtn bg-red-500 hover:bg-red-600 ml-4"
                    >
                      <DeleteOutlined className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
