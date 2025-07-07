import { Formik, Form, Field, ErrorMessage } from "formik";
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
  postcode: Yup.string()
    .matches(/^\d{4,10}$/, "Postcode must be 4–10 digits")
    .required("Postcode is required"),
  contactName: Yup.string()
    .test(
      "full-name",
      "Please enter at least first and last name",
      (value) => !!value && value.trim().split(" ").length >= 2
    )
    .required("Contact name is required"),
  contactPhone: Yup.string()
    .matches(/^\d{10,}$/, "Contact phone must be at least 10 digits")
    .required("Contact phone is required"),
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
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ContactForm = () => {
  return (
    <div className={styles.wrapper}>
      <Formik<ContactFormValues>
        initialValues={{
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
        }}
        validationSchema={contactSchema}
        onSubmit={(values) => {
          alert("Contact form submitted:\n" + JSON.stringify(values, null, 2));
        }}
      >
        {({ isValid, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={styles.formTitle}>Contact us</h2>
            <p className={styles.formSubtitle}>
              Need an experienced and skilled hand with custom IT projects? Fill
              out the form to get a free consultation.
            </p>

            <Field
              name="companyName"
              placeholder="Your Company Name"
              className={styles.input}
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className={styles.inputError}
            />

            <Field
              name="natureOfBusiness"
              placeholder="Nature of Business"
              className={styles.input}
            />

            <div className={styles.inputGroup}>
              <div className={styles.inputHalf}>
                <Field
                  name="address"
                  placeholder="Address"
                  className={styles.input}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.inputError}
                />
              </div>
              <div className={styles.inputHalf}>
                <Field
                  name="postcode"
                  placeholder="Postcode"
                  className={styles.input}
                />
                <ErrorMessage
                  name="postcode"
                  component="div"
                  className={styles.inputError}
                />
              </div>
            </div>

            <Field
              name="contactName"
              placeholder="Contact Name"
              className={styles.input}
            />
            <ErrorMessage
              name="contactName"
              component="div"
              className={styles.inputError}
            />

            <Field
              name="contactPhone"
              placeholder="Contact Phone"
              className={styles.input}
            />
            <ErrorMessage
              name="contactPhone"
              component="div"
              className={styles.inputError}
            />

            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.inputError}
            />

            <Field
              name="linkedin"
              placeholder="Linkedin"
              className={styles.input}
            />

            <Field
              as="textarea"
              name="idea"
              placeholder="Let’s talk about your idea"
              rows={4}
              className={styles.textarea}
            />
            <ErrorMessage
              name="idea"
              component="div"
              className={styles.inputError}
            />

            <label className={styles.upload}>
              Upload Additional file
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setFieldValue("file", e.currentTarget.files?.[0] || null)
                }
                style={{ display: "none" }}
              />
            </label>
            <div className={styles.note}>
              Attach file. File size of your documents should not exceed 10MB
            </div>

            <label className={styles.checkboxLabel}>
              <Field type="checkbox" name="nda" />I want to protect my data by
              signing an NDA
            </label>
            <ErrorMessage
              name="nda"
              component="div"
              className={styles.inputError}
            />

            <button
              type="submit"
              disabled={!isValid}
              className={styles.submitBtn}
            >
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>

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
        <Formik<NewsletterFormValues>
          initialValues={{ email: "" }}
          validationSchema={newsletterSchema}
          onSubmit={(values) => {
            alert("Newsletter subscribed: " + values.email);
          }}
        >
          {({ isValid }) => (
            <Form className={styles.newsletterForm}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={styles.newsletterInput}
              />
              <button
                type="submit"
                disabled={!isValid}
                className={styles.newsletterBtn}
              >
                ✓
              </button>
              <ErrorMessage
                name="email"
                component="div"
                className={styles.inputError}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
