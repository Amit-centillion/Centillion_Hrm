import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { errorHandler } from "../apis/error";
import { ROLES } from "../constants/roles";
import { showAlert } from "../hooks";
import { useAuth } from "./";

export const OvertimeContext = createContext({
  overtimes: [],
  paginatedOvertimes: [],
  onLoadOvertime: async () => {},
  onUpdateOvertime: async () => {},
  onApproveOvertime: async () => {},
});

export const OvertimeProvider = ({ children }) => {
  const [overtimes, setOvertimes] = useState([]);
  const [paginatedOvertimes, setPaginatedOvertimes] = useState(null);
  const { getRole } = useAuth();

  const onLoadOvertime = useCallback(
    async (payload) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_OVERTIME_LIST
            : APIS.EMPLOYEE_OVERTIME_LIST;
        const { data } = await axios.post(API_URL, payload);
        if (data?.status) {
          if (payload?.page || payload.limit) {
            setPaginatedOvertimes(data?.overtime);
          } else {
            setOvertimes(data?.overtime);
          }
        }
      } catch (error) {}
    },
    [getRole]
  );

  const onUpdateOvertime = useCallback(
    async (values, filters) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_UPDATE_OVERTIME
            : APIS.EMPLOYEE_UPDATE_OVERTIME;
        const { data } = await axios.put(API_URL, values);
        if (data?.status) {
          if (values._id) {
            showAlert("Overtime updated successfully", "success");
          } else {
            showAlert("Overtime added successfully", "success");
          }
          await onLoadOvertime(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadOvertime, getRole]
  );

  const onApproveOvertime = useCallback(
    async (values, filters) => {
      try {
        const { data } = await axios.put(APIS.ADMIN_APPROVE_OVERTIME, values);
        if (data?.status) {
          await onLoadOvertime(filters);
          return data;
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    [onLoadOvertime]
  );

  const values = {
    overtimes,
    paginatedOvertimes,
    onLoadOvertime: useCallback(
      async (payload) => {
        return await onLoadOvertime(payload);
      },
      [onLoadOvertime]
    ),
    onUpdateOvertime: useCallback(
      async (payload, filters) => {
        return await onUpdateOvertime(payload, filters);
      },
      [onUpdateOvertime]
    ),
    onApproveOvertime: useCallback(
      async (payload, filters) => {
        return await onApproveOvertime(payload, filters);
      },
      [onApproveOvertime]
    ),
  };

  return (
    <OvertimeContext.Provider value={values}>
      {children}
    </OvertimeContext.Provider>
  );
};

export const useOvertime = () => useContext(OvertimeContext);
