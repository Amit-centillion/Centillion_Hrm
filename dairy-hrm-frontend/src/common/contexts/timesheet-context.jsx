import { createContext, useState, useCallback } from "react";
import axios from "../apis/axios";
import { APIS } from "../apis";
import { errorHandler } from "../apis/error";
import { useContext } from "react";
import { AuthContext } from "./";
import { ROLES } from "../constants/roles";

export const TimesheetContext = createContext({
  timesheets: [],
  paginatedTimesheets: [],
  onLoadTimesheet: async () => {},
  onUpdateTimesheet: async () => {},
});

export const TimesheetProvider = ({ children }) => {
  const [timesheets, setTimesheets] = useState([]);
  const [paginatedTimesheets, setPaginatedTimesheets] = useState(null);
  const { getRole } = useContext(AuthContext);

  const onLoadTimesheet = useCallback(
    async (payload) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_TIMESHEET_LIST
            : APIS.EMPLOYEE_TIMESHEET_LIST;
        const { data } = await axios.post(API_URL, payload);
        if (data?.status) {
          if (payload.page || payload.limit) {
            setPaginatedTimesheets(data?.timesheets);
          } else {
            setTimesheets(data?.timesheets);
          }
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [getRole]
  );

  const onUpdateTimesheet = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(
          APIS.EMPLOYEE_UPDATE_TIMESHEET,
          payload
        );
        if (data?.status) {
          await onLoadTimesheet(filters);
          return data;
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadTimesheet]
  );

  const value = {
    timesheets,
    paginatedTimesheets,
    onLoadTimesheet: useCallback(
      async (payload) => {
        return await onLoadTimesheet(payload);
      },
      [onLoadTimesheet]
    ),
    onUpdateTimesheet: useCallback(
      async (payload, filters) => {
        return await onUpdateTimesheet(payload, filters);
      },
      [onUpdateTimesheet]
    ),
  };

  return (
    <TimesheetContext.Provider value={value}>
      {children}
    </TimesheetContext.Provider>
  );
};

export const useTimesheet = () => useContext(TimesheetContext);
