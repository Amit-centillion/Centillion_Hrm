import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDepartment } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { DepartmentValidation } from "../../../common/validations/department-validation";

export const DepartmentForm = ({
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
    defaultValues: initialValues,
    resolver: yupResolver(DepartmentValidation),
  });
  const { onUpdateDepartment } = useDepartment();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateDepartment(payload, filters);
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
            {initialValues ? "Edit Department" : "Add Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                label={"Name"}
                {...register("name")}
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
