import { createContext, useCallback, useContext, useState } from "react";
import { APIS } from "../apis";
import axios from "../apis/axios";
import { errorHandler } from "../apis/error";

export const MenuContext = createContext({
  menus: [],
  paginatedMenus: [],
  onLoadMenus: async () => {},
  onUpdateMenus: async () => {},
});

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [paginatedMenus, setPaginatedMenus] = useState([]);
  const onLoadMenus = useCallback(async (payload) => {
    try {
      const { data } = await axios.post(APIS.ADMIN_MENU_LIST, payload);
      if (data?.status) {
        if (payload?.page || payload?.limit) {
          setPaginatedMenus(data?.menus);
        } else {
          setMenus(data?.menus);
        }
      }
    } catch (error) {
      return errorHandler(error);
    }
  }, []);

  const onUpdateMenus = useCallback(
    async (payload, filters) => {
      try {
        const { data } = await axios.post(APIS.ADMIN_UPDATE_MENU, {
          ...payload,
          roles: payload?.role?.map((item) => item.value),
        });
        if (data?.status) {
          await onLoadMenus(filters);
          return data;
        }
      } catch (error) {
        return errorHandler(error);
      }
    },
    [onLoadMenus]
  );

  const values = {
    menus,
    paginatedMenus,
    onLoadMenus: useCallback(
      async (payload) => {
        await onLoadMenus(payload);
      },
      [onLoadMenus]
    ),
    onUpdateMenus: useCallback(
      async (payload, filters) => {
        return await onUpdateMenus(payload, filters);
      },
      [onUpdateMenus]
    ),
  };
  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export const useMenu = () => useContext(MenuContext);
