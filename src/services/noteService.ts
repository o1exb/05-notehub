import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

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
  results: Note[];
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  id: string;
}

interface ApiNotesResponse {
  page?: number;
  perPage?: number;
  totalPages?: number;
  totalItems?: number;
  results?: Note[];
  data?: Note[];
  notes?: Note[]; // нове поле
}

export async function fetchNotes(
  params: FetchNotesParams,
  signal?: AbortSignal
): Promise<FetchNotesResponse> {
  // ⬇️ дістаємо page/perPage/search із params
  const { page, perPage, search } = params;

  const res = await API.get<ApiNotesResponse>("/notes", {
    // ⬇️ не шлемо порожній search
    params: { page, perPage, ...(search ? { search } : {}) },
    signal,
  });

  const raw = res.data;

  const results: Note[] = Array.isArray(raw?.results)
    ? raw.results
    : Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw?.notes)
        ? raw.notes
        : [];

  return {
    page: Number(raw?.page ?? page ?? 1),
    perPage: Number(raw?.perPage ?? perPage ?? 12),
    totalPages: Number(raw?.totalPages ?? 0),
    totalItems: Number(raw?.totalItems ?? results.length),
    results,
  };
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const res = await API.post<Note>("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const res = await API.delete<DeleteNoteResponse>(`/notes/${id}`);
  return res.data;
}
