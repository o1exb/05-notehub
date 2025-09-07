import type { ChangeEventHandler } from "react";
import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const SearchBox = ({ value, onChange }: Props) => {
  const handle: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search..."
      value={value}
      onChange={handle}
    />
  );
};

export default SearchBox;
