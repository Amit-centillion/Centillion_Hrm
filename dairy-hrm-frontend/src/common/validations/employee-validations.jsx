import * as yup from "yup";
import { ERRORS } from "../constants/errors";

export const EmployeeValidation = yup.object().shape({
  firstName: yup.string().required(ERRORS.FIRSTNAME_REQUIRED),
  lastName: yup.string().required(ERRORS.LASTNAME_REQUIRED),
  email: yup
    .string()
    .required(ERRORS.EMAIL_REQUIRED)
    .email(ERRORS.INVALID_EMAIL),
  password: yup.string().required(ERRORS.PASSWORD_REQUIRED),
  mobileNo: yup.string().required(ERRORS.PHONENO_REQUIRED),
  joiningDate: yup.string().required(ERRORS.DATE_REQUIRED),
  department: yup.mixed().required(ERRORS.DEPARTMENT_REQUIRED),
  designation: yup.mixed().required(ERRORS.DESIGNATION_REQUIRED),
  gender: yup.mixed().required(ERRORS.GENDER_REQUIRED),
  role: yup.mixed().required(ERRORS.ROLE_REQUIRED),
});
