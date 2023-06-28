import { format } from "date-fns";

export const adminAttendanceColumns = () => {
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
        return `${row?.user.firstName} ${row?.user.lastName}` || "--";
      },
    },
    {
      Header: "Work Date",
      accessor: (row, index) => {
        return format(new Date(row?.workDate), "dd MMM yyyy") || "--";
      },
    },
    {
      Header: "Punch In",
      accessor: (row) => {
        return format(new Date(row?.startTime), "hh.mm aa") || "--";
      },
    },
    {
      Header: "Punch Out",
      accessor: (row) => {
        return row?.endTime ? format(new Date(row?.endTime), "hh.mm aa") : "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.hours ? `${Math.floor(row.hours)}.${row.minutes}` : "--";
      },
    },
    {
      Header: "Overtime",
      accessor: (row) => {
        return row?.overtime?.length ? row?.overtime?.[0]?.hours : "0";
      },
    },
  ];
};

export const employeeAttendanceColumns = () => {
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
      Header: "Punch In",
      accessor: (row) => {
        return format(new Date(row?.startTime), "hh.mm aa") || "--";
      },
    },
    {
      Header: "Punch Out",
      accessor: (row) => {
        return row?.endTime ? format(new Date(row?.endTime), "hh.mm aa") : "--";
      },
    },
    {
      Header: "Work Hours",
      accessor: (row) => {
        return row.hours ? `${Math.floor(row.hours)}.${row.minutes}` : "--";
      },
    },
    {
      Header: "Overtime",
      accessor: (row) => {
        let hours = 0;
        if (row?.overtime?.length) {
          row?.overtime.forEach((item) => {
            hours += item?.hours;
          });
        }
        return row?.overtime.length ? hours : "--";
      },
    },
  ];
};
