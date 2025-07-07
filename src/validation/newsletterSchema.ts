import * as Yup from "yup";

export const newsletterSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
});
