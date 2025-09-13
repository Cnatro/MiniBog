import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import {
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../contants";
import type { Post } from "../../typeModule";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addPost } from "../../redux/actions/postActions";

// Validation schema
const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title cannot exceed 200 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(50, "Content must be at least 50 characters")
    .required("Content is required"),
  // imgUrl: Yup.string()
  //   .url("Invalid image URL")
  //   .required("Image URL is required"),
});

interface PostFormValues {
  title: string;
  content: string;
  imgUrl: string;
}

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.posts.isLoading);
  const dispatch = useAppDispatch();

  const initialValues: PostFormValues = {
    title: "",
    content: "",
    imgUrl: "",
  };

  const handleSubmit = async (values: PostFormValues) => {
    const postAdd = {
      title: values.title,
      userId: Number(user.id),
      content: values.content,
    };

    dispatch(addPost(postAdd as Post));
    navigate(ROUTE.HOME);
  };

  const goBack = () => {
    navigate(ROUTE.HOME);
  };

  return (
    <div className="addpost-container">
      <div className="addpost-wrapper">
        {/* Header */}
        <div className="addpost-header">
          <button onClick={goBack} className="addpost-backbtn">
            <ArrowLeftOutlined className="mr-1" />
            Back
          </button>
          <h1 className="addpost-title">
            <PlusOutlined className="mr-2" />
            Add New Post
          </h1>
        </div>

        {/* Form */}
        <div className="addpost-formbox">
          <Formik
            initialValues={initialValues}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="addpost-form">
                {/* Title Field */}
                <div className="addpost-form-group">
                  <label className="addpost-form-label">Post Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter your post title..."
                    className="addpost-input"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="addpost-error"
                  />
                </div>

                {/*               
                <div className="addpost-form-group">
                  <label className="addpost-form-label">Image URL</label>
                  <div className="addpost-imageurl-row">
                    <div className="addpost-imageurl-input">
                      <div className="addpost-input-wrapper">
                        <Field
                          name="imgUrl"
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          className="addpost-input pl-10"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue("imgUrl", e.target.value);
                            setPreviewUrl(e.target.value);
                          }}
                        />
                        <FileImageOutlined className="addpost-input-icon" />
                      </div>
                      <ErrorMessage
                        name="imgUrl"
                        component="div"
                        className="addpost-error"
                      />
                    </div>

                    <button
                      type="button"
                      className="addpost-uploadbtn"
                      onClick={() => {
                        const mockImageUrl =
                          "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                        setFieldValue("imgUrl", mockImageUrl);
                        setPreviewUrl(mockImageUrl);
                      }}
                    >
                      <UploadOutlined className="mr-2" />
                      Upload Image
                    </button>
                  </div>


                  {previewUrl && (
                    <div className="addpost-preview">
                      <p className="addpost-preview-label">Image Preview:</p>
                      <div className="addpost-preview-box">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="addpost-preview-img"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://via.placeholder.com/400x200?text=Image+not+available";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div> */}

                {/* Content Field */}
                <div className="addpost-form-group">
                  <label className="addpost-form-label">Post Content</label>
                  <Field
                    name="content"
                    as="textarea"
                    rows={8}
                    placeholder="Enter your post content..."
                    className="addpost-textarea"
                  />
                  <div className="addpost-content-footer">
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="addpost-error"
                    />
                    <span
                      className={`addpost-charcount ${
                        values.content.length < 50
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {values.content.length}/50 characters
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="addpost-submitbox">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`addpost-submitbtn ${
                      isLoading ? "disabled" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="addpost-spinner"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <SaveOutlined className="mr-2" />
                        Save Post
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Info Box */}
        <div className="addpost-infobox">
          <h2 className="addpost-info-title">Tips for Effective Writing</h2>
          <ul className="addpost-info-list">
            <li>Keep your title concise, engaging, and under 200 characters</li>
            <li>Use high-quality images to attract readers</li>
            <li>Break your content into short, easy-to-read paragraphs</li>
            <li>Check spelling and grammar before posting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
