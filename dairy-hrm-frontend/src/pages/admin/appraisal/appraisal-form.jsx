import { format } from "date-fns";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppraisal } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";

export const AppraisalForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
  employees = [],
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });
  const { onUpdateAppraisal } = useAppraisal();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateAppraisal(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const selectedEmployee = employees.find(
        (item) => item.value === initialValues?.employee?._id
      );
      const payload = {
        ...initialValues,
        salary: initialValues?.salary?.basic,
        employee: selectedEmployee ? selectedEmployee : {},
        appraisalDate: format(
          new Date(initialValues.appraisalDate),
          "yyyy-MM-dd"
        ),
      };
      reset(payload);
    }
  }, [initialValues, employees, reset]);
  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Appraisal" : "Add Appraisal"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMSelect
                name={"employee"}
                control={control}
                options={employees}
                placeholder={"Select Employee"}
                error={errors?.employee}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                label={"Basic salary"}
                {...register("salary")}
                error={errors?.salary}
              />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                type="date"
                label={"Appraisal Date"}
                {...register("appraisalDate")}
                error={errors?.appraisalDate}
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
