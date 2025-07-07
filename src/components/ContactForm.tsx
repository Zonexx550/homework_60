import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

interface ContactFormValues {
  companyName: string;
  natureOfBusiness: string;
  address: string;
  postcode: string;
  contactName: string;
  contactPhone: string;
  email: string;
  linkedin: string;
  idea: string;
  file: File | null;
  nda: boolean;
}

interface NewsletterFormValues {
  email: string;
}

const contactSchema = Yup.object({
  companyName: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  natureOfBusiness: Yup.string(),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  postcode: Yup.string().required("Postcode is required"),
  contactName: Yup.string()
    .test(
      "full-name",
      "Please enter at least first and last name",
      (value) => !!value && value.trim().split(" ").length >= 2
    )
    .required("Contact name is required"),
  contactPhone: Yup.string().required("Contact phone is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  linkedin: Yup.string(),
  idea: Yup.string()
    .min(30, "Idea description must be at least 30 characters")
    .required("Idea is required"),
  file: Yup.mixed<File>()
    .nullable()
    .test("fileSize", "File size is too large (max 10MB)", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 10 * 1024 * 1024;
    }),
  nda: Yup.boolean()
    .oneOf([true], "You must agree to NDA")
    .required("You must agree to NDA"),
});

const newsletterSchema = Yup.object({
  email: Yup.string().email().required(),
});

export const ContactForm = () => {
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      companyName: "",
      natureOfBusiness: "",
      address: "",
      postcode: "",
      contactName: "",
      contactPhone: "",
      email: "",
      linkedin: "",
      idea: "",
      file: null,
      nda: false,
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      alert("Contact form submitted:\n" + JSON.stringify(values, null, 2));
    },
  });

  const newsletterFormik = useFormik<NewsletterFormValues>({
    initialValues: { email: "" },
    validationSchema: newsletterSchema,
    onSubmit: (values) => {
      alert("Newsletter subscribed: " + values.email);
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>Contact us</h2>
        <p className={styles.formSubtitle}>
          Need an experienced and skilled hand with custom IT projects? Fill out
          the form to get a free consultation.
        </p>

        <input
          name="companyName"
          placeholder="Your Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <div className={styles.inputError}>{formik.errors.companyName}</div>
        )}

        <input
          name="natureOfBusiness"
          placeholder="Nature of Business"
          value={formik.values.natureOfBusiness}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />

        <div className={styles.inputGroup}>
          <div className={styles.inputHalf}>
            <input
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
            />
            {formik.touched.address && formik.errors.address && (
              <div className={styles.inputError}>{formik.errors.address}</div>
            )}
          </div>
          <div className={styles.inputHalf}>
            <input
              name="postcode"
              placeholder="Postcode"
              value={formik.values.postcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
            />
            {formik.touched.postcode && formik.errors.postcode && (
              <div className={styles.inputError}>{formik.errors.postcode}</div>
            )}
          </div>
        </div>

        <input
          name="contactName"
          placeholder="Contact Name"
          value={formik.values.contactName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.contactName && formik.errors.contactName && (
          <div className={styles.inputError}>{formik.errors.contactName}</div>
        )}

        <input
          name="contactPhone"
          placeholder="Contact Phone"
          value={formik.values.contactPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.contactPhone && formik.errors.contactPhone && (
          <div className={styles.inputError}>{formik.errors.contactPhone}</div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <div className={styles.inputError}>{formik.errors.email}</div>
        )}

        <input
          name="linkedin"
          placeholder="Linkedin"
          value={formik.values.linkedin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />

        <textarea
          name="idea"
          placeholder="Let’s talk about your idea"
          value={formik.values.idea}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          className={styles.textarea}
        />
        {formik.touched.idea && formik.errors.idea && (
          <div className={styles.inputError}>{formik.errors.idea}</div>
        )}

        <label className={styles.upload}>
          Upload Additional file
          <input
            type="file"
            name="file"
            onChange={(e) =>
              formik.setFieldValue("file", e.currentTarget.files?.[0] || null)
            }
            style={{ display: "none" }}
          />
        </label>
        <div className={styles.note}>
          Attach file. File size of your documents should not exceed 10MB
        </div>

        <button
          type="submit"
          disabled={!formik.isValid}
          className={styles.submitBtn}
        >
          SUBMIT
        </button>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="nda"
            checked={formik.values.nda}
            onChange={formik.handleChange}
          />
          I want to protect my data by signing an NDA
        </label>
        {formik.touched.nda && formik.errors.nda && (
          <div className={styles.inputError}>{formik.errors.nda}</div>
        )}
      </form>

      <div className={styles.sidebar}>
        <h4>Offices</h4>
        <p>
          United States
          <br />
          500 5th Avenue Suite 400, NY 10110
        </p>
        <p>
          United Kingdom
          <br />
          High St, Bromley BR1 1DN
        </p>
        <p>
          France
          <br />
          80 avenue des Terroirs de France, Paris
        </p>

        <h4>For Quick Inquiries</h4>
        <p>🇬🇧 +44 7777777777</p>
        <p>🇺🇸 +1 3333333330</p>

        <h5>Would you like to join our newsletter?</h5>
        <form
          onSubmit={newsletterFormik.handleSubmit}
          className={styles.newsletterForm}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={newsletterFormik.values.email}
            onChange={newsletterFormik.handleChange}
            onBlur={newsletterFormik.handleBlur}
            className={styles.newsletterInput}
          />
          <button
            type="submit"
            disabled={!newsletterFormik.isValid}
            className={styles.newsletterBtn}
          >
            ✓
          </button>
        </form>
        {newsletterFormik.touched.email && newsletterFormik.errors.email && (
          <div className={styles.inputError}>
            {newsletterFormik.errors.email}
          </div>
        )}
      </div>
    </div>
  );
};
