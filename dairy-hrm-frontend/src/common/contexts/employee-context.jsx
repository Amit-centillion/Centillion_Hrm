import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { showAlert } from "../hooks";

export const EmployeeContext = createContext({
  employees: [],
  paginatedEmployees: [],
  summary: {},
  onLoadEmployees: async () => {},
  onUpdateEmployees: async () => {},
  onLoadSummary: async () => {},
  onPunchTime: async () => {},
});

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null);
  const [paginatedEmployees, setPaginatedEmployees] = useState(null);
  const [summary, setSummary] = useState(null);
  const onLoadEmployees = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_EMPLOYEE_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedEmployees(data?.employees);
        } else {
          setEmployees(data?.employees);
        }
      }
    } catch (error) {}
  }, []);

  const onUpdateEmployees = useCallback(
    async (payload, filters) => {
      try {
        payload = {
          ...payload,
          department: payload?.department?.value,
          designation: payload?.designation?.value,
          gender: payload?.gender.value,
          role: payload?.role?.value,
        };

        const { data } = await axios.put(APIS.ADMIN_UPDATE_EMPLOYEE, payload);
        if (data?.status) {
          if (payload?.isDeleted) {
            showAlert("Employee deleted successfully", "success");
          } else if (payload._id) {
            showAlert("Employee updated successfully", "success");
          } else {
            showAlert("Employee added successfully", "success");
          }
          await onLoadEmployees(filters);
          return data;
        }
      } catch (error) {
        showAlert(error?.message, "error");
      }
    },
    [onLoadEmployees]
  );

  const onLoadSummary = useCallback(async () => {
    try {
      const { data } = await axios.get(APIS.EMPLOYEE_SUMMARY);
      if (data?.status) {
        setSummary(data?.summary);
      } else {
        setSummary(null);
      }
    } catch (error) {}
  }, []);

  const onPunchTime = useCallback(async () => {
    try {
      const { data } = await axios.get(APIS.EMPLOYEE_PUNCH);
      if (data?.status) {
        await onLoadSummary();
        return data.punch;
      }
    } catch (error) {}
  }, [onLoadSummary]);

  const values = {
    employees,
    paginatedEmployees,
    summary,
    onLoadEmployees: useCallback(
      async (payload) => {
        return await onLoadEmployees(payload);
      },
      [onLoadEmployees]
    ),
    onUpdateEmployees: useCallback(
      async (payload, filters) => {
        return await onUpdateEmployees(payload, filters);
      },
      [onUpdateEmployees]
    ),
    onLoadSummary: useCallback(async () => {
      return await onLoadSummary();
    }, [onLoadSummary]),
    onPunchTime: useCallback(async () => {
      return await onPunchTime();
    }, [onPunchTime]),
  };
  return (
    <EmployeeContext.Provider value={values}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
