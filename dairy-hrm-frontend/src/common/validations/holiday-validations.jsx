import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const HolidayValidation = yup.object().shape({
  name: yup.string().required(ERRORS.NAME_REQUIRED),
  holidayDate: yup.string().required(ERRORS.DATE_REQUIRED),
});
