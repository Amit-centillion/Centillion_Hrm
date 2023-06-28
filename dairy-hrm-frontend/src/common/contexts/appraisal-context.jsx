import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { errorHandler } from "../apis/error";
import { showAlert } from "../hooks";

export const AppraisalContext = createContext({
  appraisals: [],
  paginatedAppraisals: null,
  onLoadAppraisals: async () => {},
  onUpdateAppraisal: async () => {},
});

export const AppraisalProvider = ({ children }) => {
  const [appraisals, setAppraisals] = useState([]);
  const [paginatedAppraisals, setPaginatedAppraisals] = useState([]);
  const onLoadAppraisals = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_APPRAISAL_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedAppraisals(data?.appraisals);
        } else {
          setAppraisals(data?.appraisals);
        }
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, []);

  const onUpdateAppraisal = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(APIS.ADMIN_UPDATE_APPRAISAL, {
          ...payload,
          employee: payload?.employee?.value,
        });
        if (data?.status) {
          if (payload?._id) {
            showAlert("Appraisal updated successfully", "success");
          } else {
            showAlert("Appraisal added successfully", "success");
          }
          await onLoadAppraisals(filters);
          return data;
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadAppraisals]
  );

  const value = {
    appraisals,
    paginatedAppraisals,
    onLoadAppraisals: useCallback(
      async (payload) => {
        return await onLoadAppraisals(payload);
      },
      [onLoadAppraisals]
    ),
    onUpdateAppraisal: useCallback(
      async (payload, filters) => {
        return await onUpdateAppraisal(payload, filters);
      },
      [onUpdateAppraisal]
    ),
  };
  return (
    <AppraisalContext.Provider value={value}>
      {children}
    </AppraisalContext.Provider>
  );
};

export const useAppraisal = () => useContext(AppraisalContext);
