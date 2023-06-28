import { format } from "date-fns";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { leaveTypeOptions } from "../../../common/constants/options";
import { useLeave } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { LeavesValidation } from "../../../common/validations/leaves-validations";
import { yupResolver } from "@hookform/resolvers/yup";

export const LeaveForm = ({
  visible,
  onClose,
  initialValues = null,
  filters,
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(LeavesValidation),
  });
  const { onUpdateLeave } = useLeave();

  const onHandleForm = async (values) => {
    const result = await onUpdateLeave(values, filters);
    if (result?.status) {
      onClose();
    }
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const selected = leaveTypeOptions.find(
        (item) => item.value === initialValues.leaveType
      );
      const payload = {
        ...initialValues,
        from: format(new Date(initialValues.from), "yyyy-MM-dd"),
        to: format(new Date(initialValues.to), "yyyy-MM-dd"),
        leaveType: selected ? selected : {},
      };

      reset(payload);
    }
  }, [initialValues, reset]);

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Leave" : "Apply Leave"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMSelect
                label={"Leave Type"}
                options={leaveTypeOptions}
                control={control}
                name="leaveType"
                placeholder="Select leave type"
                error={errors?.leaveType}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type="date"
                label={"From"}
                {...register("from")}
                error={errors?.from}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type="date"
                label={"To"}
                {...register("to")}
                error={errors?.to}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type={"number"}
                label={"Number of Days"}
                {...register("noOfDays")}
                error={errors?.days}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                as="textarea"
                label={"Reason"}
                {...register("reason")}
                error={errors?.reason}
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
