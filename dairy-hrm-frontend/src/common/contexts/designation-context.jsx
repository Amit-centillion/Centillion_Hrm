import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";

export const DesignationContext = createContext({
  designations: [],
  paginatedDesignations: [],
  onLoadDesignations: async (payload) => {},
  onUpdateDesignation: async (payload, filters) => {},
});

export const DesignationProvider = ({ children }) => {
  const [designations, setDesignations] = useState([]);
  const [paginatedDesignations, setPaginatedDesignations] = useState([]);

  const onLoadDesignations = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_DESIGNATION_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedDesignations(data?.designations);
        } else {
          setDesignations(data?.designations);
        }
      }
    } catch (error) {}
  }, []);

  const onUpdateDesignation = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.put(APIS.ADMIN_UPDATE_DESIGNATION, {
          ...payload,
          department: payload.department.value,
        });
        if (data?.status) {
          await onLoadDesignations(filters);
          return data;
        }
      } catch (error) {}
    },
    [onLoadDesignations]
  );

  const values = {
    designations,
    paginatedDesignations,
    onLoadDesignations: useCallback(
      async (payload) => {
        return await onLoadDesignations(payload);
      },
      [onLoadDesignations]
    ),
    onUpdateDesignation: useCallback(
      async (payload, filters) => {
        return await onUpdateDesignation(payload, filters);
      },
      [onUpdateDesignation]
    ),
  };

  return (
    <DesignationContext.Provider value={values}>
      {children}
    </DesignationContext.Provider>
  );
};

export const useDesignation = () => useContext(DesignationContext);
