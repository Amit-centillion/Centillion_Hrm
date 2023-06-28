import React from "react";
import { Link } from "react-router-dom";
import { Image, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { componentRoutes } from "../../common/constants/component-routes";
import logo from "../../assets/img/logocs3.png";
import { HRMFormInput } from "../components/hrm-input";
import { useAuth } from "../../common/contexts/auth-context";
import { authLoginValidation } from "../../common/validations/auth-validations";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(authLoginValidation) });
  const { onHandleLogin } = useAuth();
  const onSubmitLogin = async (values) => {
    await onHandleLogin(values);
  };
  return (
    <React.Fragment>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              <div className="account-logo">
                <Link to={componentRoutes.adminDashboard}>
                  <Image src={logo} alt="Centillion Softech" />
                </Link>
              </div>
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  <Form onSubmit={handleSubmit(onSubmitLogin)}>
                    <HRMFormInput
                      label={"Email"}
                      placeholder={"Enter Email"}
                      error={errors?.email}
                      {...register("email")}
                    />
                    <HRMFormInput
                      label={"Password"}
                      placeholder={"Enter Password"}
                      type="password"
                      error={errors?.password}
                      {...register("password")}
                    />
                    <Link to={"/"} className="text-muted float-end">
                      Forgot Password?
                    </Link>
                    <Form.Group className="form-group text-center">
                      <Button type="submit" className="account-btn">
                        Login
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
