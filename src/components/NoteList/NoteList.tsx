import type { Note } from "../../types/note";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes.length) return null;

  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id} style={{ marginBottom: 12 }}>
          <h2>{n.title}</h2>
          <p>{n.content}</p>
          <div>
            <span>{n.tag}</span>{" "}
            <button onClick={() => onDelete(n.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
