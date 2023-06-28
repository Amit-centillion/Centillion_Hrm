import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLeave } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { LeavesValidation } from "../../../common/validations/leaves-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaveTypeOptions } from "../../../common/constants/options";

export const LeaveForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
  // leaveTypes = [],
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LeavesValidation) });
  const { onUpdateLeaves } = useLeave();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateLeaves(payload, filters);
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
            {initialValues ? "Edit Leave" : "Add Leave"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMSelect
                label={"Leave Type"}
                name="leaveType"
                control={control}
                options={leaveTypeOptions}
                error={errors?.leaveType}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type={"date"}
                label={"From"}
                {...register("from")}
                error={errors?.from}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type={"date"}
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
                as={"textarea"}
                label={"Reason"}
                {...register("reason")}
                error={errors?.reason}
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
