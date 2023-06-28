import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const authLoginValidation = yup.object().shape({
  email: yup
    .string()
    .required(ERRORS.EMAIL_REQUIRED)
    .email(ERRORS.INVALID_EMAIL),
  password: yup.string().required(ERRORS.PASSWORD_REQUIRED),
});
