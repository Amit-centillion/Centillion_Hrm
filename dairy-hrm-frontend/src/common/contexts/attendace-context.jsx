import { createContext, useCallback, useState, useContext } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { errorHandler } from "../apis/error";
import { ROLES } from "../constants/roles";
import { AuthContext } from "./";

export const AttendanceContext = createContext({
  attendances: [],
  paginatedAttendances: null,
  statistics: null,
  onLoadAttendace: async () => {},
  onPunchTime: async () => {},
  onLoadStatistics: async () => {},
});

export const AttendanceProvider = ({ children }) => {
  const [attendances, setAttendaces] = useState([]);
  const [paginatedAttendances, setPaginatedAttendances] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const { getRole } = useContext(AuthContext);

  const onLoadAttendace = useCallback(
    async (payload) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_ATTENDANCE_LIST
            : APIS.EMPLOYEE_ATTENDANCE_LIST;
        const { data } = await axios.post(API_URL, payload);
        if (data?.status) {
          if (payload?.page || payload?.limit) {
            setPaginatedAttendances(data.attendances);
          } else {
            setAttendaces(payload.attendances);
          }
        }
      } catch (error) {}
    },
    [getRole]
  );

  const onLoadStatistics = useCallback(async (payload) => {
    try {
      const { data } = await axios.get(APIS.EMPLOYEE_ATTENDANCE_STATISTICS);
      if (data?.status) {
        setStatistics(data.statistics);
      } else {
        setStatistics(null);
      }
    } catch (error) {}
  }, []);

  const onPunchTime = useCallback(
    async (payload) => {
      try {
        const { data } = await axios.get(APIS.EMPLOYEE_PUNCH, payload);
        if (data?.status) {
          await onLoadStatistics();
          await onLoadAttendace();
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadStatistics, onLoadAttendace]
  );

  const value = {
    attendances,
    paginatedAttendances,
    statistics,
    onLoadAttendace: useCallback(
      async (payload) => {
        return await onLoadAttendace(payload);
      },
      [onLoadAttendace]
    ),
    onPunchTime: useCallback(
      async (payload) => {
        return await onPunchTime(payload);
      },
      [onPunchTime]
    ),
    onLoadStatistics: useCallback(
      async (payload) => {
        return await onLoadStatistics(payload);
      },
      [onLoadStatistics]
    ),
  };
  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
