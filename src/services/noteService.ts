import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// типи запитів/відповідей — ТУТ
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  data: Note[];
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  id: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
  signal?: AbortSignal
): Promise<FetchNotesResponse> {
  const res = await API.get<FetchNotesResponse>("/notes", { params, signal });
  return res.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const res = await API.post<Note>("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const res = await API.delete<DeleteNoteResponse>(`/notes/${id}`);
  return res.data;
}
