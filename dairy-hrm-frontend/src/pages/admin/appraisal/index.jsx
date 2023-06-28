import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ACTIONS } from "../../../common/constants/actions";
import { useAppraisal, useEmployee } from "../../../common/contexts";
import { adminAppraisalColumns } from "../../../common/data-columns/appraisal";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";
import { AppraisalForm } from "./appraisal-form";

const AdminAppraisal = () => {
  const [isAppraisalVisible, setAppraisalVisible] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const { paginatedAppraisals, onLoadAppraisals } = useAppraisal();
  const { onLoadEmployees, employees } = useEmployee();

  const onSelectAction = useCallback(async (row, value) => {
    if (ACTIONS.EDIT === value) {
      setInitialValues(row);
      setAppraisalVisible(true);
    } else if (ACTIONS.DELETE === value) {
      // await onDeleteDesignation(row);
    }
  }, []);

  const columns = useMemo(() => {
    return adminAppraisalColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadAppraisals(filters);
    };
    fetchData();
  }, [filters, onLoadAppraisals]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadEmployees();
    };
    fetchData();
  }, [onLoadEmployees]);

  useEffect(() => {
    if (employees?.length) {
      setAllEmployees(
        employees.map((item) => {
          return {
            label: `${item.firstName} ${item.lastName}`,
            value: item._id,
          };
        })
      );
    } else {
      setAllEmployees([]);
    }
  }, [employees]);

  useEffect(() => {
    if (!isAppraisalVisible) {
      setAppraisalVisible(false);
    }
  }, [isAppraisalVisible]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Appraisal"}
        button={"Add Appraisal"}
        icon={faPlus}
        handleClick={setAppraisalVisible.bind(this, true)}
      />
      <HRMTable
        data={paginatedAppraisals}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
      {isAppraisalVisible ? (
        <AppraisalForm
          visible={isAppraisalVisible}
          filters={filters}
          onClose={setAppraisalVisible.bind(this, false)}
          employees={allEmployees}
          initialValues={initialValues}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AdminAppraisal;
