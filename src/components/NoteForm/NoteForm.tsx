import { Formik, Form, Field, ErrorMessage as FMError } from "formik";
import * as Yup from "yup";
import styles from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import type { CreateNotePayload } from "../../services/noteService";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required("Tag is required"),
});

export interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (payload: CreateNotePayload) => void;
  submitting?: boolean;
}

export default function NoteForm({
  onCancel,
  onSubmit,
  submitting,
}: NoteFormProps) {
  return (
    <Formik<CreateNotePayload>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isValid }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              className={styles.input}
            />
            <FMError name="title" component="span" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={styles.textarea}
            />
            <FMError name="content" component="span" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={styles.select}>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <FMError name="tag" component="span" className={styles.error} />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isValid || submitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
