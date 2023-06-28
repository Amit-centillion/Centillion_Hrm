import { createContext, useState, useCallback } from "react";
import axios from "../apis/axios";
import { APIS } from "../apis";
import { errorHandler } from "../apis/error";
import { useContext } from "react";

export const PolicyContext = createContext({
  policies: [],
  paginatePolicies: [],
  onLoadPolicies: async () => {},
  onUpdatePolicies: async () => {},
});

export const PolicyProvider = ({ children }) => {
  const [policies, setPolicies] = useState([]);
  const [paginatePolicies, setPaginatedPolicies] = useState(null);

  const onLoadPolicies = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.EMPLOYEE_POLICY_LIST, payload);
      if (data?.status) {
        if (payload.page || payload.limit) {
          setPaginatedPolicies(data?.policy);
        } else {
          setPolicies(data?.policy);
        }
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, []);

  const onUpdatePolicies = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(APIS.EMPLOYEE_UPDATE_POLICY, payload);
        if (data?.status) {
          await onLoadPolicies(filters);
          return data;
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadPolicies]
  );

  const value = {
    policies,
    paginatePolicies,
    onLoadPolicies: useCallback(
      async (payload) => {
        return await onLoadPolicies(payload);
      },
      [onLoadPolicies]
    ),
    onUpdatePolicies: useCallback(
      async (payload, filters) => {
        return await onUpdatePolicies(payload, filters);
      },
      [onUpdatePolicies]
    ),
  };

  return (
    <PolicyContext.Provider value={value}>{children}</PolicyContext.Provider>
  );
};

export const usePolicy = () => useContext(PolicyContext);
