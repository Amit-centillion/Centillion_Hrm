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
import { leaveTypeOptions } from "../constants/options";

export const adminLeavesColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "Employee",
      accessor: (row) => {
        return row?.employee
          ? `${row?.employee?.firstName} ${row?.employee?.lastName}`
          : "--";
      },
    },
    {
      Header: "Leave Type",
      accessor: (row, index) => {
        return row?.leaveType
          ? leaveTypeOptions.find((item) => item.value === row.leaveType).label
          : "--";
      },
    },
    {
      Header: "From",
      accessor: (row) => {
        return format(new Date(row?.from), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "To",
      accessor: (row) => {
        return format(new Date(row?.to), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "No of Days",
      accessor: (row) => {
        return `${row?.noOfDays} day` || "--";
      },
    },
    {
      Header: "Reason",
      accessor: (row) => {
        return row?.reason || "--";
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
      Header: "Approved by",
      accessor: (row) => {
        return row?.approvedBy
          ? `${row?.approvedBy?.firstName} ${row?.approvedBy?.lastName}`
          : "--";
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
                  />{" "}
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

export const employeeLeavesColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "Leave Type",
      accessor: (row, index) => {
        return row?.leaveType
          ? leaveTypeOptions.find((item) => item.value === row.leaveType).label
          : "--";
      },
    },
    {
      Header: "From",
      accessor: (row) => {
        return format(new Date(row?.from), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "To",
      accessor: (row) => {
        return format(new Date(row?.to), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "No of Days",
      accessor: (row) => {
        return `${row?.noOfDays} day` || "--";
      },
    },
    {
      Header: "Reason",
      accessor: (row) => {
        return row?.reason || "--";
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
      Header: "Approved by",
      accessor: (row) => {
        return row?.approvedBy
          ? `${row?.approvedBy?.firstName} ${row?.approvedBy?.lastName}`
          : "--";
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
    : status === "DECLINED"
    ? "text-danger"
    : "text-warning";
};

const getStatus = (status) => {
  return status === "NEW"
    ? "New"
    : status === "APPROVED"
    ? "Approved"
    : status === "DECLINED"
    ? "Declined"
    : "Pending";
};
