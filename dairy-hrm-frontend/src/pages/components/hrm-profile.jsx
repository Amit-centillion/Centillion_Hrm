import { format } from "date-fns";
import React, { useEffect } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import profileImg from "../../assets/img/profiles/avatar-02.jpg";
import { genderOptions } from "../../common/constants/options";
import { useAuth } from "../../common/contexts";
import { formatMobileNumber, showCustomName } from "../../common/utils";

export const HRMProfile = () => {
  const { getProfile, profile } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
    };
    fetchData();
  }, [getProfile]);

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col md={12}>
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    {profile?.profile ? (
                      <Image src={profileImg} />
                    ) : (
                      <div className="customer-profile d-flex align-items-center justify-content-center">
                        <span>{showCustomName(profile)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-basic">
                  <Row>
                    <Col md={5}>
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">
                          {profile?.firstName} {profile?.lastName}
                        </h3>
                        <h6 className="text-muted">
                          {profile?.department?.name}
                        </h6>
                        <small className="text-muted">
                          {profile?.designation?.name}
                        </small>
                        {/* <div className="staff-id">Employee ID : FT-0001</div> */}
                        <div className="small doj text-muted">
                          Date of Join :{" "}
                          {profile?.joiningDate
                            ? format(
                                new Date(profile?.joiningDate),
                                "dd MMM yyyy"
                              )
                            : "--"}
                        </div>
                      </div>
                    </Col>
                    <Col md={5}>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            {formatMobileNumber(profile?.mobileNo) || "--"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            <span>{profile?.email || "--"}</span>
                          </div>
                        </li>
                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">
                            {profile?.dob
                              ? format(new Date(profile?.dob), "dd MMM yyyy")
                              : "--"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            {profile?.address ? profile?.address?.line1 : "--"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">
                            {profile?.gender
                              ? genderOptions.find((item) => item.value)?.label
                              : ""}
                          </div>
                        </li>
                        {/* <li>
                          <div className="title">Reports to:</div>
                          <div className="text">
                            <div className="avatar-box">
                              <div class="avatar avatar-xs">
                                <img
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <a href="profile.html">Jeffery Lalor</a>
                          </div>
                        </li> */}
                      </ul>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Bank Information</Card.Title>
              <ul className="personal-info">
                <li>
                  <div className="title">Bank name</div>
                  <div className="text">{profile?.bankInfo?.name || "--"}</div>
                </li>
                <li>
                  <div className="title">Bank account No.</div>
                  <div className="text">{profile?.accountNo?.name || "--"}</div>
                </li>
                <li>
                  <div className="title">IFSC Code</div>
                  <div className="text">{profile?.ifscCode?.name || "--"}</div>
                </li>
                <li>
                  <div className="title">Branch</div>
                  <div className="text">
                    {profile?.bankInfo?.branchName || "--"}
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Leave Information</Card.Title>
              <ul className="personal-info">
                <li>
                  <div className="title">Total Leaves</div>
                  <div className="text">
                    {profile?.leaveInfo?.totalLeaves +
                      profile?.leaveInfo?.takenLeaves || "--"}
                  </div>
                </li>
                <li>
                  <div className="title">Available Leaves</div>
                  <div className="text">
                    {profile?.leaveInfo?.totalLeaves || "--"}
                  </div>
                </li>
                <li>
                  <div className="title">Taken Leaves</div>
                  <div className="text">
                    {profile?.leaveInfo?.takenLeaves || "--"}
                  </div>
                </li>
                <li>
                  <div className="title">Pending Leaves</div>
                  <div className="text">{profile?.ifscCode?.name || "--"}</div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
