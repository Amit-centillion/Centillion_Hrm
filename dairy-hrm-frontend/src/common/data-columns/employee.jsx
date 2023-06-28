import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Dropdown } from "react-bootstrap";
import { formatMobileNumber } from "../utils";

export const adminEmployeeColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "Name",
      accessor: (row) => {
        return row?.firstName ? `${row?.firstName} ${row?.lastName}` : "--";
      },
    },
    {
      Header: "Email",
      accessor: (row) => {
        return row?.email || "--";
      },
    },
    {
      Header: "Mobile No",
      accessor: (row) => {
        return row?.mobileNo ? formatMobileNumber(row?.mobileNo) : "--";
      },
    },
    {
      Header: "Join Date",
      accessor: (row) => {
        return row?.joiningDate
          ? format(new Date(row?.joiningDate), "dd MMM yyyy")
          : "--";
      },
    },

    {
      Header: "Department",
      accessor: (row) => {
        return row?.department?.name || "--";
      },
    },
    {
      Header: "Designation",
      accessor: (row) => {
        return row?.designation?.name || "--";
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
