import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserAddOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ROUTE } from "../../contants";
import {
  setAuthStatus,
  setIsAuthenticating,
} from "../../redux/actions/micsActions";
import type { UserSignUp } from "../../typeModule";
import { signUp } from "../../redux/actions/authActions";
import AuthStatusModal from "./AuthStatusModal";

// Validation schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscores are allowed"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number and special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.misc.authStatus);
  const isAuthenticating = useAppSelector(
    (state) => state.misc.isAuthenticating
  );

  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    dispatch(setAuthStatus(null));
    dispatch(setIsAuthenticating(false));
  }, [dispatch]);

  useEffect(() => {
    if (authStatus?.success) {
      const timer = setTimeout(() => {
        navigate(ROUTE.SIGN_IN, { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [authStatus, navigate]);

  const handleRegister = (values: RegisterFormValues) => {
    const userSignUp: UserSignUp = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(signUp(userSignUp));
  };

  const goToLogin = () => navigate(ROUTE.SIGN_IN);

  // Password strength
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return { text: "Weak", variant: "danger", width: 20 };
    if (strength <= 3) return { text: "Fair", variant: "warning", width: 50 };
    if (strength <= 4) return { text: "Strong", variant: "info", width: 80 };
    return { text: "Very Strong", variant: "success", width: 100 };
  };

  return (
    <div className="signup-container">
      <AuthStatusModal />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="signup-card">
              <div className="card-header-custom">
                <div className="avatar-circle">
                  <UserAddOutlined
                    style={{ fontSize: "32px", color: "white" }}
                  />
                </div>
                <h2 className="text-white mb-2 fw-bold">Sign Up</h2>
                <p className="text-white-50 mb-0">
                  Create a new account to get started
                </p>
              </div>

              <Card.Body className="p-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={RegisterSchema}
                  onSubmit={handleRegister}
                >
                  {({ errors, touched, values }) => (
                    <Form>
                      {/* Username */}
                      <div className="mb-3">
                        <label className="fw-medium">
                          <UserOutlined className="me-2" />
                          Username
                        </label>
                        <div className="position-relative">
                          <Field
                            name="username"
                            as="input"
                            type="text"
                            disabled={isAuthenticating}
                            placeholder="Enter username"
                            className={`form-control-custom ${
                              errors.username && touched.username
                                ? "is-invalid"
                                : values.username && !errors.username
                                ? "is-valid"
                                : ""
                            }`}
                          />
                          <UserOutlined className="signup-input-icon" />
                          {values.username && !errors.username && (
                            <CheckCircleOutlined className="success-icon" />
                          )}
                        </div>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="fw-medium">
                          <MailOutlined className="me-2" />
                          Email
                        </label>
                        <div className="position-relative">
                          <Field
                            name="email"
                            as="input"
                            type="email"
                            disabled={isAuthenticating}
                            placeholder="Enter your email"
                            className={`form-control-custom ${
                              errors.email && touched.email
                                ? "is-invalid"
                                : values.email &&
                                  !errors.email &&
                                  values.email.includes("@")
                                ? "is-valid"
                                : ""
                            }`}
                          />
                          <MailOutlined className="signup-input-icon" />
                          {values.email &&
                            !errors.email &&
                            values.email.includes("@") && (
                              <CheckCircleOutlined className="success-icon" />
                            )}
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Password */}
                      <div className="mb-3">
                        <label className="fw-medium">
                          <LockOutlined className="me-2" />
                          Password
                        </label>
                        <div className="position-relative">
                          <Field
                            name="password"
                            as="input"
                            type={showPassword ? "text" : "password"}
                            disabled={isAuthenticating}
                            placeholder="Enter password"
                            className={`form-control-custom ${
                              errors.password && touched.password
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <LockOutlined className="signup-input-icon" />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeTwoTone />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </button>
                        </div>

                        {values.password && (
                          <div className="mt-2">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <small className="text-muted">
                                Password strength:
                              </small>
                              <small
                                className={`fw-medium text-${
                                  getPasswordStrength(values.password).variant
                                }`}
                              >
                                {getPasswordStrength(values.password).text}
                              </small>
                            </div>
                            <ProgressBar
                              variant={
                                getPasswordStrength(values.password).variant
                              }
                              now={getPasswordStrength(values.password).width}
                              className="strength-indicator"
                            />
                          </div>
                        )}
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-3">
                        <label className="fw-medium">
                          <LockOutlined className="me-2" />
                          Confirm Password
                        </label>
                        <div className="position-relative">
                          <Field
                            name="confirmPassword"
                            as="input"
                            type={showConfirmPassword ? "text" : "password"}
                            disabled={isAuthenticating}
                            placeholder="Confirm password"
                            className={`form-control-custom ${
                              errors.confirmPassword && touched.confirmPassword
                                ? "is-invalid"
                                : values.confirmPassword &&
                                  values.password === values.confirmPassword
                                ? "is-valid"
                                : ""
                            }`}
                          />
                          <LockOutlined className="signup-input-icon" />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeTwoTone />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isAuthenticating}
                        className="btn-register w-100 mb-3"
                        size="lg"
                      >
                        {isAuthenticating ? (
                          <>
                            <div className="loading-spinner d-inline-block me-2"></div>
                            Registering...
                          </>
                        ) : (
                          <>
                            <UserAddOutlined className="me-2" />
                            Sign Up
                          </>
                        )}
                      </Button>

                      {/* Password Info */}
                      <div className="info-box mb-3">
                        <div className="d-flex align-items-start">
                          <InfoCircleOutlined className="text-primary me-2 mt-1" />
                          <div>
                            <p className="small fw-medium text-primary mb-1">
                              Password requirements:
                            </p>
                            <ul className="small text-muted mb-0 ps-3">
                              <li>At least 8 characters</li>
                              <li>At least 1 uppercase letter</li>
                              <li>At least 1 lowercase letter</li>
                              <li>At least 1 number</li>
                              <li>At least 1 special character (@$!%*?&)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Redirect */}
                      <div className="text-center pt-3 border-top">
                        <p className="text-muted small mb-0">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={goToLogin}
                            className="btn btn-link p-0 link-custom small"
                          >
                            Sign in now
                          </button>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
