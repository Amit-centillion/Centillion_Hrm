import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHoliday } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HolidayValidation } from "../../../common/validations/holiday-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { format } from "date-fns";

export const HolidayForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(HolidayValidation),
  });
  const { onUpdateHoliday } = useHoliday();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateHoliday(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const payload = {
        ...initialValues,
        holidayDate: format(new Date(initialValues.holidayDate), "yyyy-MM-dd"),
      };
      reset(payload);
    }
  }, [initialValues, reset]);

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Holiday" : "Add Holiday"}
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
            <Col sm={12}>
              <HRMFormInput
                label={"Date"}
                {...register("holidayDate")}
                type="date"
                error={errors?.holidayDate}
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
