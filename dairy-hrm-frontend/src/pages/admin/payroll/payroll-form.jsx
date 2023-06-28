import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { paymentTypes } from "../../../common/constants/options";
import { usePayroll } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";

export const PayrollForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
  employees = [],
  settings = [],
}) => {
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({ defaultValues: initialValues });
  const { onUpdatePayroll } = usePayroll();
  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdatePayroll(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (settings.length) {
      setAllowances(
        settings.filter((item) => item.type === paymentTypes.ALLOWANCES)
      );
      setDeductions(
        settings.filter((item) => item.type === paymentTypes.DEDUCTION)
      );
    } else {
      setAllowances([]);
      setDeductions([]);
    }
  }, [settings]);

  const onEmployeeChange = useCallback(
    (value) => {
      let totalAllowances = 0;
      let totalDeductions = 0;
      let userAllowances = [];
      let userDeductions = [];
      const payload = {
        employee: value,
        basic: value?.salary,
      };

      allowances.forEach((item) => {
        let calculation = (value?.salary * item?.percentage) / 100;
        totalAllowances += calculation;
        Object.assign(payload, {
          [item.value]: calculation,
        });
        userAllowances.push({
          label: item.label,
          percentage: item.percentage,
          amount: calculation,
          setting: item?._id,
        });
      });

      deductions.forEach((item) => {
        let calculation = (value?.salary * item?.percentage) / 100;
        totalDeductions += calculation;
        Object.assign(payload, {
          [item.value]: calculation,
        });
        userDeductions.push({
          label: item.label,
          percentage: item.percentage,
          amount: calculation,
          setting: item?._id,
        });
      });

      Object.assign(payload, {
        netSalary: value?.salary + totalAllowances - totalDeductions,
        salary: {
          basic: value?.salary,
          allowances: userAllowances,
          deductions: userDeductions,
        },
      });

      reset((formvalues) => ({
        ...formvalues,
        ...payload,
        payrollMonth: format(new Date(formvalues?.payrollMonth), "yyyy-MM"),
      }));
    },
    [allowances, deductions, reset]
  );

  useEffect(() => {
    const employee = employees.find(
      (item) => item?.value === initialValues?.employee?._id
    );
    if (employee) {
      onEmployeeChange(employee);
    }
  }, [initialValues, employees, onEmployeeChange]);
  return (
    <Modal show={visible} onHide={onClose} size={"lg"} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Payroll" : "Add Payroll"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <HRMSelect
                name={"employee"}
                control={control}
                label={"Employee"}
                options={employees}
                placeholder={"Select Employee"}
                onChange={onEmployeeChange.bind(this)}
              />
            </Col>
            <Col sm={6}>
              <HRMFormInput
                type="month"
                label={"Payroll Month"}
                {...register("payrollMonth")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Row>
                <h4 className="text-primary">Allowances</h4>
                <Col sm={12}>
                  <HRMFormInput label={"Basic"} {...register("basic")} />
                </Col>
                {allowances?.length
                  ? allowances?.map((item, index) => (
                      <Col sm={12} key={index}>
                        <HRMFormInput
                          label={item.label}
                          {...register(item.value)}
                        />
                      </Col>
                    ))
                  : null}
                <Col sm={12}>
                  <HRMFormInput
                    label={"Net Salary"}
                    {...register("netSalary")}
                    error={errors?.netSalary}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <h4 className="text-primary">Deductions</h4>
              <Row>
                {deductions?.length
                  ? deductions?.map((item, index) => (
                      <Col sm={12} key={index}>
                        <HRMFormInput
                          label={item.label}
                          {...register(item.value)}
                        />
                      </Col>
                    ))
                  : null}
              </Row>
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
