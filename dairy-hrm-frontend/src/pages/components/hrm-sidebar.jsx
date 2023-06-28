import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth, useMenu } from "../../common/contexts";

export const HRMSidebar = () => {
  const [isMenuFetched, setMenuFetched] = useState(false);
  const [routeRole, setRouteRole] = useState("/");
  const { onLoadMenus, menus } = useMenu();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const role = user?.role?._id
        ? user?.role?._id
        : localStorage.getItem("role");
      if (!isMenuFetched && role) {
        await onLoadMenus({
          filters: { role: role },
        });
        setMenuFetched(true);
      }
    };
    fetchData();
  }, [onLoadMenus, isMenuFetched, user]);

  useEffect(() => {
    if (user?.role) {
      setRouteRole(String(user?.role?.name).toLocaleLowerCase());
    }
  }, [user]);
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="sidebar-inner file-scroll overflow-auto">
          <div className="sidebar-menu">
            <ul>
              <li className="submenu">
                {menus.map((item, index) => (
                  <NavLink to={`/${routeRole}${item.url}`} key={index}>
                    <i className={`la la-${item?.icon || "check"}`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
