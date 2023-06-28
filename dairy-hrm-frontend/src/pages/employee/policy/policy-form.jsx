import { Col, Modal, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { HRMFileInput } from "../../components/hrm-file-input";

export const PolicyForm = ({
  visible,
  onClose,
  initialValues = null,
  departments = [],
}) => {
  const { register, control } = useForm({
    defaultValues: initialValues,
  });

  return (
    <Modal show={visible} onHide={onClose} className="custom-modal">
      <Form className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {initialValues ? "Edit Policy" : "Add Policy"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <HRMFormInput label={"Policy Name"} {...register("name")} />
            </Col>
            <Col sm={12}>
              <HRMFormInput
                as="textarea"
                label={"Description"}
                {...register("description")}
              />
            </Col>
            <Col sm={12}>
              <HRMSelect
                label={"Department"}
                name={"department"}
                control={control}
                options={departments}
                placeholder={"Select Department"}
              />
            </Col>
            <Col sm={12}>
              <HRMFileInput type="file" label={"Upload Policy"} />
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
