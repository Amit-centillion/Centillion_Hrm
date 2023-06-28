import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const DepartmentValidation = yup.object().shape({
  name: yup.string().required(ERRORS.NAME_REQUIRED),
});
