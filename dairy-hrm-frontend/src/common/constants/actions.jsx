import {
  faCheckCircle,
  faEdit,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const ACTIONS = {
  EDIT: "edit",
  DELETE: "delete",
  APPROVE: "approve",
  REJECT: "reject",
};

export const DEFAULT_ACTION = [
  {
    value: ACTIONS.EDIT,
    icon: faEdit,
    color: "",
    label: "Edit",
  },
  {
    value: ACTIONS.DELETE,
    icon: faTrash,
    color: "",
    label: "Delete",
  },
];

export const APPROVE_ACTION = [
  {
    value: ACTIONS.APPROVE,
    icon: faCheckCircle,
    color: "text-success",
    label: "Approve",
  },
  {
    value: ACTIONS.REJECT,
    icon: faXmarkCircle,
    color: "text-danger",
    label: "Reject",
  },
];
