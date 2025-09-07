import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <p className={css.text}>
      There was an error, please try again…
      {message && <span> ({message})</span>}
    </p>
  );
}
