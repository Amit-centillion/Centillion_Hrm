import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Dropdown } from "react-bootstrap";

export const adminTimesheetColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "#",
      accessor: (row, index) => {
        return index + 1;
      },
    },
    {
      Header: "Employee",
      accessor: (row, index) => {
        return `${row?.employee.firstName} ${row?.employee.lastName}` || "--";
      },
    },
    {
      Header: "Work Date",
      accessor: (row, index) => {
        return format(new Date(row?.workDate), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.workHours || "--";
      },
    },
    {
      Header: "Description",
      accessor: (row) => {
        return row.description || "--";
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

export const employeeTimesheetColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "#",
      accessor: (row, index) => {
        return index + 1;
      },
    },
    {
      Header: "Work Date",
      accessor: (row, index) => {
        return format(new Date(row?.workDate), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.workHours || "--";
      },
    },
    {
      Header: "Description",
      accessor: (row) => {
        return row.description || "--";
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
