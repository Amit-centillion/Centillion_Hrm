import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";

export const RoleContext = createContext({
  roles: [],
  paginatedRoles: [],
  onLoadRoles: async (payload) => {},
  onUpdateRole: async (payload, filters) => {},
});

export const RoleProvider = ({ children }) => {
  const [paginatedRoles, setPaginatedRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  const onLoadRoles = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_ROLES_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedRoles(data?.roles);
        } else {
          setRoles(data?.roles);
        }
      }
    } catch (error) {}
  }, []);

  const onUpdateRole = useCallback(
    async (payload, filters) => {
      try {
        const { data } = axios.put(APIS.ADMIN_UPDATE_ROLES, payload);
        if (data?.status) {
          await onLoadRoles(filters);
        }
      } catch (error) {}
    },
    [onLoadRoles]
  );

  const values = {
    roles,
    paginatedRoles,
    onLoadRoles: useCallback(
      async (payload) => {
        return await onLoadRoles(payload);
      },
      [onLoadRoles]
    ),
    onUpdateRole: useCallback(
      async (payload, filters) => {
        return await onUpdateRole(payload, filters);
      },
      [onUpdateRole]
    ),
  };
  return <RoleContext.Provider value={values}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
