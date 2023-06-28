import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { ROLES } from "../constants/roles";
import { showAlert } from "../hooks";
import { AuthContext } from "./auth-context";

export const PayrollContext = createContext({
  payrolls: [],
  paginatedPayrolls: [],
  onLoadPayrolls: async () => {},
  onUpdatePayroll: async () => {},
});

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [paginatedPayrolls, setPaginatedPayrolls] = useState([]);
  const { getRole } = useContext(AuthContext);

  const onLoadPayrolls = useCallback(
    async (payload) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_PAYROLL_LIST
            : APIS.EMPLOYEE_PAYROLL_LIST;
        const { data } = await axios.post(API_URL, payload);
        if (data?.status) {
          if (payload?.page || payload?.limit) {
            setPaginatedPayrolls(data?.payrolls);
          } else {
            setPayrolls(data?.payrolls);
          }
        }
      } catch (error) {}
    },
    [getRole]
  );

  const onUpdatePayroll = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(APIS.ADMIN_UPDATE_PAYROLL, {
          ...payload,
          employee: payload?.employee?.value,
        });
        if (data?.status) {
          if (payload?.isDeleted) {
            showAlert("Payroll deleted successfully", "success");
          } else if (payload?._id) {
            showAlert("Payroll updated successfully", "success");
          } else {
            showAlert("Payroll created successfully", "success");
          }
          await onLoadPayrolls(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadPayrolls]
  );
  const value = {
    payrolls,
    paginatedPayrolls,
    onLoadPayrolls: useCallback(
      async (payload) => {
        return await onLoadPayrolls(payload);
      },
      [onLoadPayrolls]
    ),
    onUpdatePayroll: useCallback(
      async (payload, filters) => {
        return await onUpdatePayroll(payload, filters);
      },
      [onUpdatePayroll]
    ),
  };
  return (
    <PayrollContext.Provider value={value}>{children}</PayrollContext.Provider>
  );
};

export const usePayroll = () => useContext(PayrollContext);
