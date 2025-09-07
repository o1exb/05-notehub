import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
}

const NoteList = ({ notes }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const deleting = isPending && variables === note.id;
        return (
          <li key={note.id} className={css.listItem}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                type="button"
                className={css.button}
                disabled={deleting}
                onClick={() => mutate(note.id)}
              >
                {deleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
