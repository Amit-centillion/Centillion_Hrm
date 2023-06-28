import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const LeavesValidation = yup.object().shape({
  leaveType: yup.mixed().required(ERRORS.TYPE_REQUIRED),
  from: yup.string().required(ERRORS.DATE_REQUIRED),
  to: yup.string().required(ERRORS.DATE_REQUIRED),
  noOfDays: yup.string().required(ERRORS.DAYS_REQUIRED),
  reason: yup.string().required(ERRORS.REASON_REQUIRED),
});
