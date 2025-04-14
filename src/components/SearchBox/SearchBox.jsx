import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { useId } from "react";
import { setNameFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const id = useId();
  const handleFilterChange = (filter) => dispatch(setNameFilter(filter));

  return (
    <div className={s.wrapper}>
      <label htmlFor={id} className={s.label}>
        Find contact by name or by number
      </label>
      <input
        type="text"
        id={id}
        className={s.input}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
    </div>
  );
}
