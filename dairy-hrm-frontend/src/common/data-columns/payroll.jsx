import { format } from "date-fns";
import { HRMActions } from "../../pages/components/hrm-actions";

export const adminPayrollColumns = ({ onSelectAction }) => {
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
      Header: "Email",
      accessor: (row) => {
        return row?.employee ? `${row?.employee?.email}` : "--";
      },
    },
    {
      Header: "Join Date",
      accessor: (row) => {
        return row?.employee
          ? `${format(new Date(row?.employee?.joiningDate), "dd MMM yyyy")}`
          : "--";
      },
    },
    {
      Header: "Designation",
      accessor: (row) => {
        return row?.employee ? `${row?.employee?.designation?.name}` : "--";
      },
    },
    {
      Header: "Salary",
      accessor: (row) => {
        return row?.netSalary.toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        });
      },
    },
    {
      Header: "Payslip",
      accessor: (row) => {
        return row?.netSalary.toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        });
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

export const employeePayrollColumns = () => {
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
      Header: "Email",
      accessor: (row) => {
        return row?.employee ? `${row?.employee?.email}` : "--";
      },
    },
    {
      Header: "Join Date",
      accessor: (row) => {
        return row?.employee
          ? `${format(new Date(row?.employee?.joiningDate), "dd MMM yyyy")}`
          : "--";
      },
    },
    {
      Header: "Designation",
      accessor: (row) => {
        return row?.employee ? `${row?.employee?.designation?.name}` : "--";
      },
    },
    {
      Header: "Salary",
      accessor: (row) => {
        return row?.netSalary.toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        });
      },
    },
    // {
    //   Header: "Payslip",
    //   accessor: (row) => {
    //     return row?.netSalary.toLocaleString("en-US", {
    //       style: "currency",
    //       currency: "INR",
    //     });
    //   },
    // },
    // {
    //   Header: "Actions",
    //   accessor: (row) => {
    //     return (
    //       <div className="text-left">
    //         <HRMActions onSelectAction={onSelectAction} row={row} />
    //       </div>
    //     );
    //   },
    // },
  ];
};
