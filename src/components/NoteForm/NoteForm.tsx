import { Formik, Form, Field, ErrorMessage as FMError } from "formik";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";
import type { CreateNotePayload } from "../../services/noteService";
import css from "./NoteForm.module.css";

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
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <FMError name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />
            <FMError name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <FMError name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
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
