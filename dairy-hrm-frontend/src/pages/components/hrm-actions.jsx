import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import { APPROVE_ACTION, DEFAULT_ACTION } from "../../common/constants/actions";

export const HRMActions = ({ onSelectAction, isApprove = false, row }) => {
  return (
    <Dropdown
      className="dropdown-action"
      onSelect={onSelectAction.bind(this, row)}
    >
      <Dropdown.Toggle as="a" className="action-icon">
        <i className="material-icons">more_vert</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        {isApprove
          ? APPROVE_ACTION.map((item, index) => (
              <Dropdown.Item eventKey={item.value} key={index}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${item?.color} m-r-5`}
                />
                {item.label}
              </Dropdown.Item>
            ))
          : DEFAULT_ACTION.map((item, index) => (
              <Dropdown.Item eventKey={item.value} key={index}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${item?.color} m-r-5`}
                />
                {item.label}
              </Dropdown.Item>
            ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
