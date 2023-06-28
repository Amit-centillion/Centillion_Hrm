import { useState } from "react";
import { createContext } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { useAuth } from "./";

export const HolidayContext = createContext({
  holidays: [],
  paginatedHolidays: [],
  onLoadHolidays: async () => {},
  onUpdateHoliday: async () => {},
});

export const HolidayProvider = ({ children }) => {
  const [holidays, setHolidays] = useState([]);
  const [paginatedHolidays, setPaginatedHolidays] = useState([]);
  const { user } = useAuth();

  const onLoadHolidays = useCallback(
    async (payload) => {
      try {
        const { data } = await axios.post(
          user?.role?.name === "ADMIN"
            ? APIS.ADMIN_HOLIDAY_LIST
            : APIS.EMPLOYEE_HOLIDAY_LIST,
          payload
        );
        if (data?.status) {
          if (payload?.page || payload?.limit) {
            setPaginatedHolidays(data?.holidays);
          } else {
            setHolidays(data?.holidays);
          }
        }
      } catch (error) {}
    },
    [user]
  );

  const onUpdateHoliday = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.put(APIS.ADMIN_UPDATE_HOLIDAY, payload);
        if (data?.status) {
          await onLoadHolidays(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadHolidays]
  );

  const values = {
    holidays,
    paginatedHolidays,
    onLoadHolidays: useCallback(
      async (payload) => {
        return await onLoadHolidays(payload);
      },
      [onLoadHolidays]
    ),
    onUpdateHoliday: useCallback(
      async (payload, filters) => {
        return await onUpdateHoliday(payload, filters);
      },
      [onUpdateHoliday]
    ),
  };
  return (
    <HolidayContext.Provider value={values}>{children}</HolidayContext.Provider>
  );
};

export const useHoliday = () => useContext(HolidayContext);
