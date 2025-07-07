import * as Yup from "yup";

export const contactSchema = Yup.object({
  companyName: Yup.string().min(2).required(),
  natureOfBusiness: Yup.string(),
  address: Yup.string().min(5).required(),
  postcode: Yup.string().matches(/^\d+$/).min(4).max(10).required(),
  contactName: Yup.string()
    .matches(/^\S+\s+\S+$/)
    .required(),
  contactPhone: Yup.string()
    .matches(/^\d{10,}$/)
    .required(),
  email: Yup.string().email().required(),
  linkedin: Yup.string(),
  idea: Yup.string().min(30).required(),
  protectData: Yup.boolean().oneOf([true], "Required"),
});
