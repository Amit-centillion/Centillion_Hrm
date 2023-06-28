import React from "react";
import { useForm } from "react-hook-form";
import { useRole } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { RoleValidation } from "../../../common/validations/role-validations";

export const RoleForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RoleValidation),
  });

  const { onUpdateRole } = useRole();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateRole(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };
  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Role" : "Add Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                label={"Name"}
                {...register("name")}
                placeholder="Role Name"
                error={errors?.name}
              />
            </Col>
          </Row>
          <div className="submit-section">
            <Button type="submit" className="submit-btn">
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
