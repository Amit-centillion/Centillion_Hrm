import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDesignation } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { DesignationValidation } from "../../../common/validations/designation-validations";
import { useEffect } from "react";

export const DesignationForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
  departments = [],
}) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(DesignationValidation),
  });
  const { onUpdateDesignation } = useDesignation();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateDesignation(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const selectedDepartment = departments.find(
        (item) => item.value === initialValues?.department?._id
      );
      const payload = {
        ...initialValues,
        department: selectedDepartment ? selectedDepartment : {},
      };
      reset(payload);
    }
  }, [initialValues, departments, reset]);

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Designation" : "Add Designation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                label={"Name"}
                {...register("name")}
                placeholder="Designation Name"
                error={errors?.name}
              />
            </Col>
            <Col sm={12}>
              <HRMSelect
                name={"department"}
                control={control}
                options={departments}
                placeholder={"Select Department"}
                error={errors?.departments}
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
