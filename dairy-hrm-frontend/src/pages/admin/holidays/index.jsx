import React, { useCallback } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { adminHolidaysColumns } from "../../../common/data-columns/holiday";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { useHoliday } from "../../../common/contexts";
import { useState, useMemo, useEffect } from "react";
import { HolidayForm } from "./holiday-form";
import { ACTIONS } from "../../../common/constants/actions";
import swal from "sweetalert2";

const AdminHoliday = () => {
  const [holidayFormVisible, setHolidayFormVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { paginatedHolidays, onLoadHolidays } = useHoliday();

  const onDeleteHoliday = useCallback(async (row) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You want to delete the holiday.",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
      })
      .then((result) => {
        if (result?.isConfirmed) {
        }
      });
  }, []);

  const onSelectAction = useCallback(
    async (row, value) => {
      if (ACTIONS.EDIT === value) {
        setInitialValues(row);
        setHolidayFormVisible(true);
      } else if (ACTIONS.DELETE === value) {
        await onDeleteHoliday(row);
      }
    },
    [onDeleteHoliday]
  );

  const columns = useMemo(() => {
    return adminHolidaysColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadHolidays(filters);
    };
    fetchData();
  }, [filters, onLoadHolidays]);

  useEffect(() => {
    if (!holidayFormVisible) {
      setHolidayFormVisible(false);
    }
  }, [holidayFormVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Holidays"}
        button={"Add Holiday"}
        icon={faPlus}
        handleClick={setHolidayFormVisible.bind(this, true)}
      />

      <HRMTable
        data={paginatedHolidays}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />

      {holidayFormVisible && (
        <HolidayForm
          visible={holidayFormVisible}
          onClose={setHolidayFormVisible.bind(this, false)}
          initialValues={initialValues}
          filters={filters}
        />
      )}
    </React.Fragment>
  );
};

export default AdminHoliday;
