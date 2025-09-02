import { Formik, Form, Field, ErrorMessage as FMError } from "formik";
import * as Yup from "yup";
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
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" />
            <FMError name="title" component="span" />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <Field id="content" name="content" as="textarea" rows={6} />
            <FMError name="content" component="span" />
          </div>

          <div>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select">
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <FMError name="tag" component="span" />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" disabled={!isValid || submitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
