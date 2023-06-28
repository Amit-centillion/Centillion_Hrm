import { Navigate } from "react-router-dom";
import { componentRoutes } from "../constants/component-routes";
import { API_ERRORS } from "../constants/errors";
import { showAlert } from "../hooks";
export const errorHandler = (error) => {
  try {
    if (error?.name === "AxiosError") {
      if (error?.response?.status === API_ERRORS.UNAUTHORIZED) {
        // localStorage.removeItem("id");
        // localStorage.removeItem("email");
        // localStorage.removeItem("role");
        // localStorage.removeItem("token");
        return <Navigate to={componentRoutes.login} />;
      } else {
        showAlert(error?.response?.data?.message, "error");
      }
    } else {
      showAlert(error?.message, "error");
    }
  } catch (error) {
    showAlert(error?.message, "error");
  }
};
