import { Formik, Field, Form, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Form as RBForm, Button, Card } from "react-bootstrap";
import { MailOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import {
  setAuthStatus,
  setIsAuthenticating,
} from "../../redux/actions/micsActions";
import { ROUTE } from "../../contants";
import type { UserSignIn } from "../../typeModule";
import { signIn } from "../../redux/actions/authActions";
import AuthStatusModal from "./AuthStatusModal";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.misc.authStatus);
  const isAuthenticating = useAppSelector(
    (state) => state.misc.isAuthenticating
  );

  useEffect(() => {
    return () => {
      dispatch(setAuthStatus(null));
      dispatch(setIsAuthenticating(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (authStatus?.success) {
      const timer = setTimeout(() => {
        navigate(ROUTE.HOME, { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [authStatus, navigate]);

  const onSubmitForm = (
    values: UserSignIn,
    { setSubmitting }: FormikHelpers<UserSignIn>
  ) => {
    dispatch(signIn({ email: values.email, password: values.password }));
    setSubmitting(false);
  };

  return (
    <>
      {authStatus?.success && <AuthStatusModal />}
      <div className="login-page d-flex align-items-center justify-content-center">
        <Card className="login-card shadow-lg p-4">
          <div className="text-center mb-4">
            <div className="login-icon">
              <LoginOutlined style={{ fontSize: 40, color: "#0d6efd" }} />
            </div>
            <h3 className="fw-bold">Sign In</h3>
            <p className="text-muted">Welcome back!</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={onSubmitForm}
          >
            {({ errors, touched }) => (
              <Form>
                <RBForm.Group className="mb-3">
                  <RBForm.Label>Email</RBForm.Label>
                  <div className="login-input-icon">
                    <MailOutlined className="me-2 text-muted" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      disabled={isAuthenticating}
                      as={RBForm.Control}
                      isInvalid={touched.email && !!errors.email}
                      className="rounded-pill"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </RBForm.Group>

                <RBForm.Group className="mb-3">
                  <RBForm.Label>Password</RBForm.Label>
                  <div className="login-input-icon">
                    <LockOutlined className="me-2 text-muted" />
                    <Field
                      disabled={isAuthenticating}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      as={RBForm.Control}
                      isInvalid={touched.password && !!errors.password}
                      className="rounded-pill"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </RBForm.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill py-2"
                  variant="primary"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? (
                    <>
                      <div className="loading-spinner d-inline-block me-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <LoginOutlined className="me-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
