import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const OvertimeValidation = yup.object().shape({
  overtimeDate: yup.string().required(ERRORS.DATE_REQUIRED),
  hours: yup.string().required(ERRORS.HOURS_REQUIRED),
  description: yup.string().required(ERRORS.DESCRIPTION_REQUIRED),
});
