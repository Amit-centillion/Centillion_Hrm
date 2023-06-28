import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useOvertime } from "../../../common/contexts";
import { OvertimeValidation } from "../../../common/validations/overtime-validation";
import { HRMFormInput } from "../../components/hrm-input";

export const OvertimeForm = ({
  visible,
  onClose,
  initialValues = null,
  filters,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(OvertimeValidation),
  });
  const { onUpdateOvertime } = useOvertime();

  const onHandleForm = async (values) => {
    const result = await onUpdateOvertime(values, filters);
    if (result?.status) {
      onClose();
    }
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const payload = {
        ...initialValues,
        overtimeDate: format(
          new Date(initialValues.overtimeDate),
          "yyyy-MM-dd"
        ),
      };
      reset(payload);
    }
  }, [initialValues, reset]);

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Overtime" : "Add Overtime"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                type="date"
                label={"Date"}
                {...register("overtimeDate")}
                error={errors?.overtimeDate}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type="number"
                label={"Hours"}
                {...register("hours")}
                error={errors?.hours}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                as="textarea"
                label={"Description"}
                {...register("description")}
                error={errors?.description}
                rows={4}
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
