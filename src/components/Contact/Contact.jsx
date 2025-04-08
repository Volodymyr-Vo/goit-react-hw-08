import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  return (
    <div className={css.contact}>
      <p className={css.contactName}>{name}</p>
      <p className={css.contactNumber}>{number}</p>
      <button
        className={css.btnDelete}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
}
