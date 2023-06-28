import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";

export const DepartmentContext = createContext({
  departments: [],
  paginatedDepartments: [],
  onLoadDepartments: async (payload) => {},
  onUpdateDepartment: async (payload, filters) => {},
});
export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [paginatedDepartments, setPaginatedDepartments] = useState([]);

  const onLoadDepartments = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_DEPARTMENT_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedDepartments(data?.departments);
        } else {
          setDepartments(data?.departments);
        }
      }
    } catch (error) {}
  }, []);

  const onUpdateDepartment = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.put(APIS.ADMIN_UPDATE_DEPARTMENT, payload);
        if (data?.status) {
          await onLoadDepartments(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadDepartments]
  );

  const values = {
    departments,
    paginatedDepartments,
    onLoadDepartments: useCallback(
      async (payload) => {
        return await onLoadDepartments(payload);
      },
      [onLoadDepartments]
    ),
    onUpdateDepartment: useCallback(
      async (payload, filters) => {
        return await onUpdateDepartment(payload, filters);
      },
      [onUpdateDepartment]
    ),
  };
  return (
    <DepartmentContext.Provider value={values}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartment = () => useContext(DepartmentContext);
