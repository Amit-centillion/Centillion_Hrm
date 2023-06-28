import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HRMActions } from "../../pages/components/hrm-actions";

export const adminRolesColumns = ({ onSelectAction }) => {
  return [
    {
      Header: "#",
      accessor: (row, index) => {
        return index + 1;
      },
    },
    {
      Header: "Role Name",
      accessor: (row) => {
        return row?.name || "--";
      },
    },
    {
      Header: "Status",
      accessor: (row) => {
        return (
          <div className="action-label">
            <span className="btn btn-white btn-sm btn-rounded">
              <FontAwesomeIcon
                icon={faDotCircle}
                className={row?.isActive ? "text-success" : "text-danger"}
              />{" "}
              {row?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Actions",
      accessor: (row) => {
        return (
          <div className="text-left">
            <HRMActions onSelectAction={onSelectAction} row={row} />
          </div>
        );
      },
    },
  ];
};
