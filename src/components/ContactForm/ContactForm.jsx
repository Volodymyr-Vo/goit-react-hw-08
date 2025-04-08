import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/slice";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 333-22-22")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.username.toLowerCase()
    );

    if (isDuplicate) {
      alert("This contact already exists!");
      return;
    }

    dispatch(addContact({ name: values.username, number: values.phone }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ username: "", phone: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor="username">Name</label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id="username"
          />
          <ErrorMessage
            className={css.error}
            name="username"
            component="span"
          />
        </div>

        <div className={css.container}>
          <label htmlFor="phone">Phone</label>
          <Field className={css.field} type="text" name="phone" id="phone" />
          <ErrorMessage className={css.error} name="phone" component="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
