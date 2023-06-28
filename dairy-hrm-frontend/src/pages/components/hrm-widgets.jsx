import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

export const DashWidget = (props) => {
  return (
    <Card className="dash-widget">
      <Card.Body>
        <span className="dash-widget-icon">
          <FontAwesomeIcon icon={props?.icon}></FontAwesomeIcon>
        </span>
        <div className="dash-widget-info">
          <h3>{props?.count || 0}</h3>
          <span>{props?.title}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export const StatsWidget = (props) => {
  return (
    <div className="stats-info">
      <h6>{props?.title}</h6>
      <h4>
        {props?.count} <span>{props?.title}</span>
      </h4>
    </div>
  );
};

export const ProfileCard = (props) => {
  return (
    <li>
      <div className="title">{props?.title} :</div>
      <div className="text">{props?.text}</div>
    </li>
  );
};

export const InfoCard = (props) => {
  return (
    <Card.Title>
      <div className="d-flex justify-content-between">
        <h4>{props?.header}</h4>
        <div className="pro-edit">
          <Link to={"#"} className="edit-icon">
            <FontAwesomeIcon icon={faPencil} />
          </Link>
        </div>
      </div>
    </Card.Title>
  );
};
