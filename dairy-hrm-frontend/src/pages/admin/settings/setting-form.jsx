import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HRMFormInput } from "../../components/hrm-input";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { HRMFormSwitch } from "../../components/hrm-switch";
import { useSettings } from "../../../common/contexts";
import { HRMSelect } from "../../components/hrm-select";
import { payrollTypeOptions } from "../../../common/constants/options";

export const SettingsForm = ({ visible, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "settings",
  });
  const { onUpdatePayrollSetting } = useSettings();
  const onHandleForm = async (payload) => {
    try {
      await onUpdatePayrollSetting(payload);
      onClose();
    } catch (error) {}
  };

  return (
    <Modal show={visible} onHide={onClose} size={"lg"} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{"Add Settings"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput
                label={"Title"}
                {...register("title")}
                placeholder="Title"
                error={errors?.title}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <HRMSelect
                control={control}
                name="type"
                options={payrollTypeOptions}
                placeholder={"Select Type"}
              />
            </Col>
            <Col sm={2}>
              <HRMFormSwitch
                label={"Status"}
                {...register("status")}
                error={errors?.status}
              />
            </Col>
          </Row>
          {fields.map((item, index) => (
            <Row key={index}>
              <Col sm={3}>
                <HRMFormInput
                  {...register(`settings.${index}.label`)}
                  placeholder="Label"
                />
              </Col>
              <Col sm={3}>
                <HRMFormInput
                  {...register(`settings.${index}.value`)}
                  placeholder="Value"
                />
              </Col>
              <Col sm={3}>
                <HRMFormInput
                  {...register(`settings.${index}.percentage`)}
                  placeholder="Percentage"
                />
              </Col>
              <Col sm={2}>
                <Button
                  className="btn-danger w-100 set-btn"
                  onClick={remove.bind(this, index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="justify-content-end">
            <Col sm={2}>
              <Button
                className="w-100 set-btn"
                onClick={append.bind(this, { label: "", percentage: "" })}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
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
