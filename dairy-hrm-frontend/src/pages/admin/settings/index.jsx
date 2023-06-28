import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSettings } from "../../../common/contexts";
import { HRMFormInput } from "../../components/hrm-input";
import HRMPageHeader from "../../components/hrm-page-header";
import { HRMFormSwitch } from "../../components/hrm-switch";
import { SettingsForm } from "./setting-form";

const AdminSettings = () => {
  const [settings, setSettings] = useState([]);
  const [isSettingFormVisible, setSettingsFormVisible] = useState(false);
  const { payroll, onLoadPayrollSetting, onUpdateAllPayrollSetting } =
    useSettings();

  useEffect(() => {
    const fetchData = async () => {
      await onLoadPayrollSetting();
    };
    fetchData();
  }, [onLoadPayrollSetting]);

  const onUpdateValue = (label, event) => {
    if (payroll?.length) {
      let updated = payroll?.map((item) => {
        if (item?.settings?.length) {
          let settings = item?.settings?.map((value) => {
            if (value?.label === label) {
              let data = {
                ...value,
                percentage: event?.target?.value,
              };
              return data;
            } else {
              return value;
            }
          });
          return {
            ...item,
            settings,
          };
        } else {
          return item;
        }
      });
      setSettings(updated);
    }
  };

  useEffect(() => {
    if (payroll) {
      setSettings(payroll);
    } else {
      setSettings(null);
    }
  }, [payroll]);

  return (
    <React.Fragment>
      <HRMPageHeader
        title={"Settings"}
        button={"Add Settings"}
        icon={faPlus}
        handleClick={setSettingsFormVisible.bind(this, true)}
      />
      <Tabs className="nav-tabs-bottom">
        <Tab eventKey={"payroll"} title="Payroll">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div className="settings-widget">
                {payroll?.length
                  ? payroll.map((item, index) => (
                      <React.Fragment key={index}>
                        <Card.Title className="h3 with-switch">
                          {item.title}
                        </Card.Title>
                        <Row className="justify-content-end">
                          <Col sm={2}>
                            <HRMFormSwitch defaultChecked={item.status} />
                          </Col>
                        </Row>
                        <Row>
                          {item.settings?.length
                            ? item?.settings?.map((setting, index) => (
                                <Col sm={6} key={index}>
                                  <HRMFormInput
                                    label={setting?.label}
                                    defaultValue={setting?.percentage}
                                    onBlur={onUpdateValue.bind(
                                      this,
                                      setting?.label
                                    )}
                                  />
                                </Col>
                              ))
                            : null}
                        </Row>
                      </React.Fragment>
                    ))
                  : null}
              </div>
              <div className="submit-section">
                <Button
                  className="btn-primary submit-btn"
                  onClick={onUpdateAllPayrollSetting.bind(this, settings)}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>
      {isSettingFormVisible ? (
        <SettingsForm
          visible={isSettingFormVisible}
          onClose={setSettingsFormVisible.bind(this, false)}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AdminSettings;
