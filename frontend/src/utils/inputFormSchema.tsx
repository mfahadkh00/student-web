import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Subject is required"),
  marks: yup
    .number()
    .typeError("Invalid Value")
    .positive()
    .integer()
    .min(0, "Invalid Value")
    .max(100, "Maximum attainable marks are 100")
    .required("Marks are required"),
  grade: yup.string().required("Grade is required"),
});
