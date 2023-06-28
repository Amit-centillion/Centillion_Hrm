import { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { errorHandler } from "../apis/error";
import axios from "../apis/axios";
import { APIS } from "../apis";
import { showAlert } from "../hooks";

export const SettingsContext = createContext({
  payroll: [],
  onLoadPayrollSetting: async () => {},
  onUpdatePayrollSetting: async () => {},
  onUpdateAllPayrollSetting: async () => {},
});

export const SettingsProvider = ({ children }) => {
  const [payroll, setPayroll] = useState({});
  const onLoadPayrollSetting = useCallback(async (payload) => {
    try {
      const { data } = await axios.get(APIS.ADMIN_PAYROLL_SETTINGS, payload);
      if (data?.status) {
        setPayroll(data?.payroll);
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, []);

  const onUpdatePayrollSetting = useCallback(
    async (payload) => {
      try {
        const { data } = await axios.post(APIS.ADMIN_UPDATE_PAYROLL_SETTINGS, {
          ...payload,
          type: payload?.type?.value,
        });
        if (data?.status) {
          showAlert("Payroll settings added successfully", "success");
          await onLoadPayrollSetting();
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadPayrollSetting]
  );

  const onUpdateAllPayrollSetting = useCallback(
    async (payload) => {
      try {
        const { data } = await axios.post(
          APIS.ADMIN_UPDATE_ALL_PAYROLL_SETTINGS,
          payload
        );
        if (data?.status) {
          showAlert("Payroll settings updated successfully", "success");
          await onLoadPayrollSetting();
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadPayrollSetting]
  );

  const value = {
    payroll,
    onLoadPayrollSetting: useCallback(
      async (payload) => {
        return await onLoadPayrollSetting(payload);
      },
      [onLoadPayrollSetting]
    ),
    onUpdatePayrollSetting: useCallback(
      async (payload) => {
        return await onUpdatePayrollSetting(payload);
      },
      [onUpdatePayrollSetting]
    ),
    onUpdateAllPayrollSetting: useCallback(
      async (payload) => {
        return await onUpdateAllPayrollSetting(payload);
      },
      [onUpdateAllPayrollSetting]
    ),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
