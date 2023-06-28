import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

export const adminDepartmentColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "#",
      accessor: (row, index) => {
        return index + 1;
      },
    },
    {
      Header: "Department Name",
      accessor: (row) => {
        return row?.name || "--";
      },
    },
    {
      Header: "Actions",
      accessor: (row) => {
        return (
          <div className="text-left">
            <Dropdown
              className="dropdown-action"
              onSelect={onSelectAction.bind(this, row)}
            >
              <Dropdown.Toggle as="a" className="action-icon">
                <i className="material-icons">more_vert</i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item eventKey={"edit"}>
                  <FontAwesomeIcon icon={faPencil} className="m-r-5" /> Edit
                </Dropdown.Item>
                <Dropdown.Item eventKey={"delete"}>
                  <FontAwesomeIcon icon={faTrash} className="m-r-5" /> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      },
    },
  ];
};
