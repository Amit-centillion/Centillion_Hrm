import React, { useMemo, useState, useEffect, useCallback } from "react";
import { usePolicy } from "../../../common/contexts";
import { employeePolicyColumns } from "../../../common/data-columns";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMTable } from "../../components/hrm-table";

const EmployeePolicy = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { onLoadPolicies, paginatedPolicy } = usePolicy();

  const onSelectAction = useCallback(() => {}, []);

  const columns = useMemo(() => {
    return employeePolicyColumns({ onSelectAction });
  }, [onSelectAction]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadPolicies(filters);
    };
    fetchData();
  }, [filters, onLoadPolicies]);

  return (
    <React.Fragment>
      <HRMPageHeader title={"Policy"} />
      <HRMTable
        data={paginatedPolicy}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default EmployeePolicy;
