import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { componentRoutes } from "../common/constants/component-routes";
import { pageRoutes } from "../common/constants/page-routes";
import { useAuth } from "../common/contexts";
import { PrivateRoute } from "./private-routes";

export const AppRoutes = () => {
  const { token, user, onVerifyToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token && !user) {
        const result = await onVerifyToken();
        if (!result?.status) {
          navigate(componentRoutes.login);
        }
      }
    };
    fetchData();
  }, [token, user, onVerifyToken, navigate]);

  return (
    <Routes>
      {pageRoutes.map((route, index) => (
        <Route
          path={route.path}
          element={<PrivateRoute route={route} />}
          key={index}
        />
      ))}
    </Routes>
  );
};
