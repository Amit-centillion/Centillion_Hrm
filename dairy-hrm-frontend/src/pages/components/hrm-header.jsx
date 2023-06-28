import React, { useState, useEffect } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { componentRoutes } from "../../common/constants/component-routes";
import logo from "../../assets/img/logoWhite.png";
import adminPic from "../../assets/img/profiles/avatar-01.jpg";
import { useAuth } from "../../common/contexts";
import { headerOptions } from "../../common/constants/options";
import { ROLES } from "../../common/constants/roles";
import { showCustomName } from "../../common/utils";

export const HRMHeader = () => {
  const [role, setRole] = useState();
  const { onLogoutUser, getRole, user } = useAuth();
  const navigate = useNavigate();
  const onSelectOptions = async (eventKey) => {
    if (eventKey === headerOptions.MY_PROFILE) {
      if (ROLES.ADMIN === role) {
        navigate(componentRoutes.adminProfile);
      } else {
        navigate(componentRoutes.employeeProfile);
      }
    } else if (eventKey === headerOptions.SETTINGS) {
      navigate(componentRoutes.adminSettings);
    } else if (eventKey === headerOptions.LOGOUT) {
      await onLogoutUser();
    } else if (eventKey === headerOptions.CHANGE_PASSWORD) {
      if (ROLES.ADMIN === role) {
        navigate(componentRoutes.adminChangePassword);
      } else {
        navigate(componentRoutes.employeeChangePassword);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const role = await getRole();
      setRole(role);
    };
    fetchData();
  }, [getRole]);

  return (
    <React.Fragment>
      <div className="header">
        <div className="header-left">
          <Link to={componentRoutes.root}>
            <Image
              src={logo}
              alt="Centillion Softech"
              style={{ height: 60, width: 65, padding: 5 }}
            />
          </Link>
        </div>
        <div className="page-title-box">
          <h3>Centillion Softech</h3>
        </div>
        <div className="nav user-menu ">
          {/* <Form.Check type="switch" className="switch-custom" /> */}
          <Dropdown
            className=" nav-item dropdown  main-drop"
            onSelect={onSelectOptions.bind(this)}
          >
            <Dropdown.Toggle style={{ background: "none", border: "none" }}>
              <span className="user-img">
                {user?.profile ? (
                  <Image
                    src={adminPic}
                    alt=""
                    style={{ height: 50, width: 50, padding: 5 }}
                  />
                ) : (
                  <div
                    className="custom-img"
                    style={{ height: 50, width: 50, padding: 5 }}
                  >
                    {showCustomName(user)}
                  </div>
                )}
                <span className="status online"></span>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={headerOptions.MY_PROFILE}>
                My Profile
              </Dropdown.Item>
              {ROLES.ADMIN === role ? (
                <Dropdown.Item eventKey={headerOptions.SETTINGS}>
                  Settings
                </Dropdown.Item>
              ) : null}
              <Dropdown.Item eventKey={headerOptions.CHANGE_PASSWORD}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item eventKey={headerOptions.LOGOUT}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </React.Fragment>
  );
};
