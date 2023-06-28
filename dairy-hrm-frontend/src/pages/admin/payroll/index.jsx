import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import swal from "sweetalert2";
import { ACTIONS } from "../../../common/constants/actions";
import { useEmployee, usePayroll, useSettings } from "../../../common/contexts";
import { adminPayrollColumns } from "../../../common/data-columns/payroll";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { PayrollForm } from "./payroll-form";

const AdminPayroll = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [isPayrollVisible, setPayrollVisible] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [settings, setSettings] = useState([]);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { onLoadEmployees, employees } = useEmployee();
  const { onLoadPayrollSetting, payroll } = useSettings();
  const { paginatedPayrolls, onLoadPayrolls, onUpdatePayroll } = usePayroll();

  useEffect(() => {
    const fetchData = async () => {
      await onLoadPayrolls(filters);
    };
    fetchData();
  }, [onLoadPayrolls, filters]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadEmployees();
      await onLoadPayrollSetting();
    };
    fetchData();
  }, [onLoadEmployees, onLoadPayrollSetting]);

  useEffect(() => {
    if (employees?.length) {
      setAllEmployees(
        employees.map((item) => {
          return {
            label: `${item?.firstName} ${item.lastName}`,
            value: item?._id,
            salary: item?.salaryInfo?.basic || 0,
          };
        })
      );
    } else {
      setAllEmployees([]);
    }
  }, [employees]);

  useEffect(() => {
    let allSettings = [];
    if (payroll.length) {
      for (const item of payroll) {
        const payload = item.settings.map((setting) => {
          return {
            ...setting,
            type: item?.type,
            _id: item._id,
          };
        });

        allSettings.push(...payload);
      }
      setSettings([...allSettings]);
    } else {
      setSettings([]);
    }
  }, [payroll]);

  const onDeletePayroll = useCallback(
    async (row) => {
      try {
        swal
          .fire({
            title: "Are you sure?",
            text: `You want to delete the payroll of ${row?.employee?.firstName} ${row?.employee?.lastName}`,
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Confirm",
          })
          .then(async (result) => {
            if (result?.isConfirmed) {
              await onUpdatePayroll({ ...row, isDeleted: true }, filters);
            }
          });
      } catch (error) {}
    },
    [filters, onUpdatePayroll]
  );

  const onSelectAction = useCallback(
    async (row, type) => {
      if (ACTIONS.EDIT === type) {
        setInitialValues(row);
        setPayrollVisible(true);
      } else if (ACTIONS.DELETE === type) {
        await onDeletePayroll(row);
      }
    },
    [onDeletePayroll]
  );

  const columns = useMemo(() => {
    return adminPayrollColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    if (!isPayrollVisible) {
      setPayrollVisible(false);
    }
  }, [isPayrollVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Payroll"}
        button={"Add Payroll"}
        icon={faPlus}
        handleClick={setPayrollVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedPayrolls}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isPayrollVisible ? (
        <PayrollForm
          visible={isPayrollVisible}
          filters={filters}
          onClose={setPayrollVisible.bind(this, false)}
          employees={allEmployees}
          settings={settings}
          initialValues={initialValues}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AdminPayroll;
