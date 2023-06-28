import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const TimesheetValidation = yup.object().shape({
  date: yup.string().required(ERRORS.DATE_REQUIRED),
  description: yup.string().required(ERRORS.DESCRIPTION_REQUIRED),
});
