import { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMenu } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";

export const MenuForm = ({
  visible,
  onClose,
  filters,
  initialValues = null,
  roles = [],
}) => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: initialValues,
  });
  const { onUpdateMenus } = useMenu();

  const onHandleForm = async (payload) => {
    try {
      const result = await onUpdateMenus(payload, filters);
      if (result?.status) {
        onClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (initialValues instanceof Object) {
      const selectedRoles = roles.filter((item) =>
        initialValues?.roles?.includes(item.value) ? item : null
      );

      const payload = {
        ...initialValues,
        role: selectedRoles,
      };
      reset(payload);
    }
  }, [initialValues, roles, reset]);
  return (
    <Modal show={visible} onHide={onClose} size={"lg"} className="custom-modal">
      <Form onSubmit={handleSubmit(onHandleForm)} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Menu" : "Add Menu"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <HRMFormInput label={"Name"} {...register("name")} />
            </Col>
            <Col sm={6}>
              <HRMFormInput label={"Label"} {...register("label")} />
            </Col>
            <Col sm={6}>
              <HRMFormInput label={"Url"} {...register("url")} />
            </Col>
            <Col sm={6}>
              <HRMFormInput label={"Icon"} {...register("icon")} />
            </Col>
            <Col sm={6}>
              <HRMSelect
                name={"role"}
                control={control}
                label={"Role"}
                options={roles}
                isMulti={true}
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
