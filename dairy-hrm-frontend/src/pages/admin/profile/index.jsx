import React from "react";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMProfile } from "../../components/hrm-profile";

const AdminProfile = () => {
  return (
    <React.Fragment>
      <HRMPageHeader title={"Profile"} />
      <HRMProfile />
    </React.Fragment>
  );
};

export default AdminProfile;
