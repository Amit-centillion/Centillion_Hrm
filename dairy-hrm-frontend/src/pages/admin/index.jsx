import React from "react";
import { Row, Col } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import HRMPageHeader from "../components/hrm-page-header";
import { DashWidget } from "../components/hrm-widgets";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <HRMPageHeader title={"Dashboard"} />
      <Row>
        <Col md={6} sm={6} lg={6} xl={4}>
          <DashWidget icon={faUsers} count={44} title={"Clients"} />
        </Col>
        <Col md={6} sm={6} lg={6} xl={4}>
          <DashWidget icon={faUsers} count={112} title={"Employees"} />
        </Col>
        <Col md={6} sm={6} lg={6} xl={4}>
          <DashWidget icon={faUsers} count={100} title={"Attendance"} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AdminDashboard;
