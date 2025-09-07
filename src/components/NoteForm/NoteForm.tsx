import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNotePayload } from "../../services/noteService";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

const AVAILABLE_TAGS: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

interface Props {
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(AVAILABLE_TAGS).required(),
});

const NoteForm = ({ onCancel }: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  return (
    <Formik<CreateNotePayload>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        await mutateAsync(values);
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" id="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              name="content"
              id="content"
              rows={6}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" id="tag" className={css.select}>
              {AVAILABLE_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isPending || !isValid || !dirty}
              className={css.submitButton}
            >
              Save note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
