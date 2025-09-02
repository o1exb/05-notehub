import styles from "./NoteList.module.css";
import type { Note } from "../../types/note";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}
export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes.length) return null;
  return (
    <ul className={styles.list}>
      {notes.map((n) => (
        <li className={styles.listItem} key={n.id}>
          <h2 className={styles.title}>{n.title}</h2>
          <p className={styles.content}>{n.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{n.tag}</span>
            <button className={styles.button} onClick={() => onDelete(n.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
