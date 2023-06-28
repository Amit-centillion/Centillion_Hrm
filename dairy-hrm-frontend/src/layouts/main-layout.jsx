import React from "react";
import { Container } from "react-bootstrap";
import { HRMHeader } from "../pages/components/hrm-header";
import { HRMSidebar } from "../pages/components/hrm-sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="main-wrapper">
      <HRMHeader />
      <HRMSidebar />
      <div className="page-wrapper">
        <Container fluid className="content">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
