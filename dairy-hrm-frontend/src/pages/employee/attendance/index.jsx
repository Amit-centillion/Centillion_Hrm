import { format } from "date-fns";
import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useAttendance } from "../../../common/contexts";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMFormInput } from "../../components/hrm-input";
import { HRMSelect } from "../../components/hrm-select";
import { useForm } from "react-hook-form";
import { HRMTable } from "../../components/hrm-table";
import { employeeAttendanceColumns } from "../../../common/data-columns/attendance";
import { monthOptions, yearOptions } from "../../../common/constants/options";

const EmployeeAttendance = () => {
  const [filters, setFilters] = useState({ limit: 10, page: 1 });

  const {
    statistics,
    onPunchTime,
    paginatedAttendances,
    onLoadAttendace,
    onLoadStatistics,
  } = useAttendance();

  const { control } = useForm();

  const columns = useMemo(() => {
    return employeeAttendanceColumns();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadAttendace(filters);
    };

    fetchData();
  }, [onLoadAttendace, filters]);

  useEffect(() => {
    const fetchData = async () => {
      await onLoadStatistics();
    };
    fetchData();
  }, [onLoadStatistics]);

  return (
    <React.Fragment>
      <HRMPageHeader title={"Attendance"} />
      <Row>
        <Col md={4}>
          <Card className="punch-status">
            <Card.Body>
              <Card.Title>{format(new Date(), "dd MMM, yyyy")}</Card.Title>
              {statistics?.attendance?.startTime ? (
                <div className="punch-det">
                  <h6>Punch In at</h6>
                  <p>
                    {format(
                      new Date(statistics?.attendance?.startTime),
                      "dd MMM, yyyy hh:mm aa"
                    )}
                  </p>
                </div>
              ) : null}
              <div className="punch-info">
                <div className="punch-hours">
                  <span>
                    {Math.floor(statistics?.attendance?.hours || 0)}.
                    {statistics?.attendance?.minutes || 0} hours
                  </span>
                </div>
              </div>
              <div className="punch-btn-section">
                <Button
                  className="punch-btn"
                  onClick={onPunchTime.bind(this, filters)}
                >
                  {statistics?.attendance?.entries.length
                    ? statistics.attendance?.entries[
                        statistics?.attendance?.entries.length - 1
                      ]?.out
                      ? "Punch In"
                      : "Punch Out"
                    : "Punch In"}
                </Button>
              </div>
              <div className="statistics">
                <Row>
                  <Col md={12} className="text-center">
                    <div className="stats-box">
                      <p>Break</p>
                      <h6>0.00 hrs</h6>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="att-statistics">
            <Card.Body>
              <Card.Title>Statistics</Card.Title>
              <div className="stats-list">
                <div className="stats-info">
                  <p>
                    Today
                    <strong>
                      3.45 <small>/ 8 hrs</small>
                    </strong>
                  </p>
                  <ProgressBar now={31} variant="primary" />
                </div>
                <div className="stats-info">
                  <p>
                    Weekly
                    <strong>
                      3.45 <small>/ 8 hrs</small>
                    </strong>
                  </p>
                  <ProgressBar now={60} variant="warning" />
                </div>
                <div className="stats-info">
                  <p>
                    Monthly
                    <strong>
                      3.45 <small>/ 8 hrs</small>
                    </strong>
                  </p>
                  <ProgressBar now={31} variant="success" />
                </div>
                <div className="stats-info">
                  <p>
                    Overtime
                    <strong>
                      3.45 <small>/ 8 hrs</small>
                    </strong>
                  </p>
                  <ProgressBar now={31} variant="info" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="recent-activity">
            <Card.Body>
              <Card.Title>{"Today Activity"}</Card.Title>
              <ul className="res-activity-list">
                {statistics?.attendance?.entries.length
                  ? statistics?.attendance?.entries.map((item, index) => (
                      <React.Fragment key={index}>
                        <li>
                          <p className="mb-0">Punch In at</p>
                          <p className="res-activity-time">
                            <i className="fa fa-clock-o"></i>
                            {format(new Date(item.in), "hh.mm aa")}.
                          </p>
                        </li>
                        {item?.out ? (
                          <li>
                            <p className="mb-0">Punch Out at</p>
                            <p className="res-activity-time">
                              <i className="fa fa-clock-o"></i>
                              {format(new Date(item.out), "hh.mm aa")}.
                            </p>
                          </li>
                        ) : null}
                      </React.Fragment>
                    ))
                  : null}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="filter-row">
        <Col sm={3}>
          <HRMFormInput type="date" />
        </Col>
        <Col sm={3}>
          <HRMSelect
            control={control}
            name="month"
            options={monthOptions}
            placeholder={"Select Month"}
          />
        </Col>
        <Col sm={3}>
          <HRMSelect
            control={control}
            name="year"
            options={yearOptions}
            placeholder={"Select Year"}
          />
        </Col>
        <Col sm={3}>
          <Button variant={"success"} className="w-100">
            Search
          </Button>
        </Col>
      </Row>
      <HRMTable
        data={paginatedAttendances}
        columns={columns}
        onUpdateFilter={setFilters}
        filters={filters}
      />
    </React.Fragment>
  );
};

export default EmployeeAttendance;
