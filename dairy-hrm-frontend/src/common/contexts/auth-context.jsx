import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../apis/axios";
import { APIS } from "../apis";
import { errorHandler } from "../apis/error";
import { componentRoutes } from "../constants/component-routes";
import { decodeToken, isExpired } from "react-jwt";
import { ROLES } from "../constants/roles";

export const AuthContext = createContext({
  token: "",
  user: {},
  profile: {},
  onHandleLogin: async (values) => {},
  onVerifyToken: async () => {},
  onLogoutUser: async () => {},
  getRole: async () => {},
  getProfile: async () => {},
  onChangePassword: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const onVerifyToken = useCallback(async () => {
    try {
      let id = localStorage.getItem("id");
      if (id) {
        let { data } = await axios.get(`${APIS.VERIFY_TOKEN}${id}`);
        if (data?.status) {
          const decoded = decodeToken(data?.data?.token);
          if (!token && !user) {
            const expired = isExpired(data?.data?.token);
            if (!expired) {
              localStorage.setItem("id", decoded?._id);
              localStorage.setItem("email", decoded?.email);
              localStorage.setItem("role", decoded?.role._id);
              localStorage.setItem("role_name", decoded?.role?.name);
              localStorage.setItem("token", data?.data?.token);
              setUser(decoded);
              setToken(data?.data?.token);
            } else {
              navigate(componentRoutes.login);
            }
          }
          return data;
        }
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, [token, user, navigate]);

  const onHandleLogin = useCallback(
    async (values) => {
      try {
        const { data } = await axios.post(APIS.LOGIN, values);
        if (data?.status) {
          const user = data?.data;
          localStorage.setItem("id", user?._id);
          localStorage.setItem("email", user?.email);
          localStorage.setItem("role", user?.role._id);
          localStorage.setItem("role_name", user?.role?.name);
          localStorage.setItem("token", data?.token);
          await onVerifyToken();
          if (user?.role?.name === ROLES.ADMIN) {
            navigate(componentRoutes.adminDashboard);
          } else if (user?.role?.name === ROLES.EMPLOYEE) {
            navigate(componentRoutes.employeeDashboard);
          } else {
            navigate(componentRoutes.login);
          }
          return user;
        }
        return;
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onVerifyToken, navigate]
  );

  const onLogoutUser = useCallback(async () => {
    try {
      let id = localStorage.getItem("id");
      const { data } = await axios.get(`${APIS.LOGOUT}${id}`);
      if (data.status) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("role_name");
        localStorage.removeItem("token");
        navigate(componentRoutes.login);
        return data;
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, [navigate]);

  const getRole = useCallback(async () => {
    let role = localStorage.getItem("role_name");
    // role = role ? role : user?.role?.name;
    return role;
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(APIS.GET_PROFILE);
      if (data?.status) {
        setProfile(data?.details);
      } else {
        setProfile({});
      }
    } catch (error) {}
  }, []);

  const onChangePassword = useCallback(
    async (payload) => {
      try {
        const { data } = await axios.post(APIS.CHANGE_PASSWORD, payload);
        if (data?.status) {
          await onLogoutUser();
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLogoutUser]
  );

  const values = {
    token,
    user,
    profile,
    onHandleLogin: useCallback(
      async (values) => {
        return await onHandleLogin(values);
      },
      [onHandleLogin]
    ),
    onVerifyToken: useCallback(async () => {
      return await onVerifyToken();
    }, [onVerifyToken]),
    onLogoutUser: useCallback(async () => {
      return await onLogoutUser();
    }, [onLogoutUser]),
    getRole: useCallback(async () => {
      return await getRole();
    }, [getRole]),
    getProfile: useCallback(async () => {
      return await getProfile();
    }, [getProfile]),
    onChangePassword: useCallback(
      async (payload) => {
        return await onChangePassword(payload);
      },
      [onChangePassword]
    ),
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
