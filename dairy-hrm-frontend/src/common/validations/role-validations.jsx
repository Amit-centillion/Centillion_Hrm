import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const RoleValidation = yup.object().shape({
  name: yup.string().required(ERRORS.NAME_REQUIRED),
});
