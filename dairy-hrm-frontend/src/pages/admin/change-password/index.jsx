import React from "react";
import { Col, Row } from "react-bootstrap";
import { ChangePassword } from "../../components/hrm-change-password";
import HRMPageHeader from "../../components/hrm-page-header";

const AdminChangePassword = () => {
  return (
    <React.Fragment>
      <HRMPageHeader title={"Change Password"} />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ChangePassword />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AdminChangePassword;
