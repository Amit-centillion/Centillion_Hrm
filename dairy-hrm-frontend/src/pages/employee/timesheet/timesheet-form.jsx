import { format } from "date-fns";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTimesheet } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { TimesheetValidation } from "../../../common/validations/timesheet-validations";
import { yupResolver } from "@hookform/resolvers/yup";

export const TimesheetForm = ({
  visible,
  onClose,
  initialValues = null,
  filters,
}) => {
  const { onUpdateTimesheet } = useTimesheet();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(TimesheetValidation),
  });

  const onHandleForm = async (values) => {
    const result = await onUpdateTimesheet(values, filters);
    if (result?.status) {
      onClose();
    }
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const payload = {
        ...initialValues,
        workDate: format(new Date(initialValues.workDate), "yyyy-MM-dd"),
      };

      reset(payload);
    }
  }, [initialValues, reset]);

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Timesheet" : "Add Timesheet"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                type="date"
                label={"Date"}
                {...register("workDate")}
                rows={4}
                name="date"
                error={errors?.date}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                as="textarea"
                label={"Description"}
                {...register("description")}
                rows={4}
                name="description"
                error={errors?.description}
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
