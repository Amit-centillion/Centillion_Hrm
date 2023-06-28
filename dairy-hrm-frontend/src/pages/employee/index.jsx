import { format } from "date-fns";
import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useEmployee } from "../../common/contexts/employee-context";
import HRMPageHeader from "../components/hrm-page-header";

const EmployeeDashboard = () => {
  const { summary, onLoadSummary, onPunchTime } = useEmployee();

  useEffect(() => {
    const fetchData = async () => {
      await onLoadSummary();
    };
    fetchData();
  }, [onLoadSummary]);
  return (
    summary && (
      <React.Fragment>
        <HRMPageHeader title={"Dashboard"} />
        <Row>
          <Col md={4}>
            <Card className="punch-status">
              <Card.Body>
                <Card.Title>{format(new Date(), "dd MMM, yyyy")}</Card.Title>
                {summary?.attendance?.startTime ? (
                  <div className="punch-det">
                    <h6>Punch In at</h6>
                    <p>
                      {format(
                        new Date(summary?.attendance?.startTime),
                        "dd MMM, yyyy hh:mm aa"
                      )}
                    </p>
                  </div>
                ) : null}
                <div className="punch-info">
                  <div className="punch-hours">
                    <span>
                      {Math.floor(summary?.attendance?.hours || 0)}.
                      {summary?.attendance?.minutes || 0} hours
                    </span>
                  </div>
                </div>
                <div className="punch-btn-section">
                  <Button
                    className="punch-btn"
                    onClick={onPunchTime.bind(this)}
                  >
                    {summary?.attendance?.entries.length
                      ? summary.attendance?.entries[
                          summary?.attendance?.entries.length - 1
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
            <Card className="recent-activity">
              <Card.Body>
                <Card.Title>{"Today Activity"}</Card.Title>
                <ul className="res-activity-list">
                  {summary?.attendance?.entries.length
                    ? summary?.attendance?.entries.map((item, index) => (
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
          <Col md={4}>
            <div className="dash-sidebar">
              <section>
                <h5 className="dash-title">Attendance</h5>
                <Card>
                  <Card.Body>
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>{summary?.presentDays || 0}</h4>
                        <p>Present Days</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>{summary?.absentDays || 0}</h4>
                        <p>Abesent Days</p>
                      </div>
                    </div>
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>{summary?.workDays || 0}</h4>
                        <p>Total Days</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </section>
              <section>
                <h5 className="dash-title">Your Leave</h5>
                <Card>
                  <Card.Body>
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>{summary?.user?.leaveInfo?.takenLeaves || 0}</h4>
                        <p>Leave Taken</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>{summary?.user?.leaveInfo?.totalLeaves || 0}</h4>
                        <p>Remaining Leave</p>
                      </div>
                    </div>
                    <div className="request-btn">
                      <Button className="dash-btn">Apply Leave</Button>
                    </div>
                  </Card.Body>
                </Card>
              </section>
              {summary?.upcomingHoliday ? (
                <section>
                  <h5 className="dash-title">Upcoming Holiday</h5>
                  <Card>
                    <Card.Body className="text-center">
                      <h4 className="holiday-title mb-0">
                        {format(
                          new Date(summary?.upcomingHoliday?.holidayDate),
                          "dddd dd MMM yyyy"
                        )}{" "}
                        - {summary?.upcomingHoliday?.name}
                      </h4>
                    </Card.Body>
                  </Card>
                </section>
              ) : null}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  );
};

export default EmployeeDashboard;
