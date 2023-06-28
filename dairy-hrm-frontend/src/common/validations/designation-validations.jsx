import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const DesignationValidation = yup.object().shape({
  name: yup.string().required(ERRORS.NAME_REQUIRED),
  departments: yup.string().required(ERRORS.DEPARTMENT_REQUIRED),
});
