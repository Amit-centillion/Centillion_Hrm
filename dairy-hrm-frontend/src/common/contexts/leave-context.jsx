import { createContext, useCallback, useContext, useState } from "react";
import axios from "../apis/axios";
import { APIS } from "../apis/index";
import { ROLES } from "../constants/roles";
import { AuthContext } from "./";

export const LeaveContext = createContext({
  leaves: [],
  paginatedLeaves: [],
  statistics: null,
  onLoadLeaves: async () => {},
  onUpdateLeave: async () => {},
  onLoadStatics: async () => {},
  onApproveLeave: async () => {},
});

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]);
  const [paginatedLeaves, setPaginatedLeaves] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const { getRole } = useContext(AuthContext);

  const onLoadLeaves = useCallback(
    async (payload) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_LEAVES_LIST
            : APIS.EMPLOYEE_LEAVES_LIST;
        const { data } = await axios.post(API_URL, payload);
        if (data?.status) {
          if (payload?.page || payload?.limit) {
            setPaginatedLeaves(data?.leaves);
          } else {
            setLeaves(data?.leaves);
          }
        }
      } catch (error) {}
    },
    [getRole]
  );

  const onUpdateLeave = useCallback(
    async (payload, filters) => {
      try {
        const role = await getRole();
        const API_URL =
          role === ROLES.ADMIN
            ? APIS.ADMIN_UPDATE_LEAVES
            : APIS.EMPLOYEE_UPDATE_LEAVES;
        const { data } = await axios.put(API_URL, {
          ...payload,
          leaveType: payload.leaveType?.value,
        });
        if (data?.status) {
          await onLoadLeaves(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadLeaves, getRole]
  );

  const onLoadStatics = useCallback(async () => {
    try {
      const { data } = await axios.get(APIS.EMPLOYEE_LEAVE_STATISTICS);
      if (data?.status) {
        setStatistics(data?.statistics);
      }
    } catch (error) {}
  }, []);

  const onApproveLeave = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(APIS.ADMIN_APPROVE_LEAVE, payload);
        if (data?.status) {
          await onLoadLeaves(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadLeaves]
  );

  const value = {
    leaves,
    paginatedLeaves,
    statistics,
    onLoadLeaves: useCallback(
      async (payload) => {
        return await onLoadLeaves(payload);
      },
      [onLoadLeaves]
    ),
    onUpdateLeave: useCallback(
      async (payload, filters) => {
        return await onUpdateLeave(payload, filters);
      },
      [onUpdateLeave]
    ),
    onLoadStatics: useCallback(async () => {
      return await onLoadStatics();
    }, [onLoadStatics]),
    onApproveLeave: useCallback(
      async (payload, filters) => {
        return await onApproveLeave(payload, filters);
      },
      [onApproveLeave]
    ),
  };
  return (
    <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
  );
};

export const useLeave = () => useContext(LeaveContext);
