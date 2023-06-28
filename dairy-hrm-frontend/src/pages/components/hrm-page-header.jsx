import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../common/contexts";

const HRMPageHeader = (props) => {
  const { user } = useAuth();
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">
            Welcome {user?.firstName || ""} {user?.lastName || ""} !
          </h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item active">{props?.title}</li>
          </ul>
        </div>
        {props?.button ? (
          <div className="col-auto float-end ms-auto">
            <Button className="add-btn" onClick={props?.handleClick}>
              <FontAwesomeIcon icon={props?.icon} /> {props?.button}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HRMPageHeader;
