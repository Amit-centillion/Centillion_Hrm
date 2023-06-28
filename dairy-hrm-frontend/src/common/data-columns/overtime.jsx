import {
  faCheckCircle,
  faDotCircle,
  faPencil,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Dropdown } from "react-bootstrap";

export const adminOvertimeColumns = ({ onSelectAction }) => {
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
        return `${row?.employee?.firstName} ${row?.employee?.lastName}` || "--";
      },
    },
    {
      Header: "Work Date",
      accessor: (row, index) => {
        return format(new Date(row?.overtimeDate), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.hours.toFixed(1) || "--";
      },
    },
    {
      Header: "Description",
      accessor: (row) => {
        return row.description || "--";
      },
    },
    {
      Header: "Status",
      accessor: (row) => {
        return (
          (
            <div className="action-label">
              <span className="btn btn-white btn-sm btn-rounded">
                <FontAwesomeIcon
                  icon={faDotCircle}
                  className={getStatusColor(row?.status)}
                />{" "}
                {getStatus(row?.status)}
              </span>
            </div>
          ) || "--"
        );
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
                <Dropdown.Item eventKey={"approve"}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success m-r-5"
                  />
                  Approve
                </Dropdown.Item>
                <Dropdown.Item eventKey={"reject"}>
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="text-danger m-r-5"
                  />{" "}
                  Reject
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      },
    },
  ];
};

export const employeeOvertimeColumns = ({ onSelectAction }) => {
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
        return format(new Date(row?.overtimeDate), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.hours.toFixed(1) || "--";
      },
    },
    {
      Header: "Description",
      accessor: (row) => {
        return row.description || "--";
      },
    },
    {
      Header: "Status",
      accessor: (row) => {
        return (
          (
            <div className="action-label">
              <span className="btn btn-white btn-sm btn-rounded">
                <FontAwesomeIcon
                  icon={faDotCircle}
                  className={getStatusColor(row?.status)}
                />{" "}
                {getStatus(row?.status)}
              </span>
            </div>
          ) || "--"
        );
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

const getStatusColor = (status) => {
  return status === "NEW"
    ? "text-purple"
    : status === "APPROVED"
    ? "text-success"
    : status === "REJECTED"
    ? "text-danger"
    : "text-warning";
};

const getStatus = (status) => {
  return status === "NEW"
    ? "New"
    : status === "APPROVED"
    ? "Approved"
    : status === "REJECTED"
    ? "Declined"
    : "Pending";
};
