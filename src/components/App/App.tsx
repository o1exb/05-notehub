import { useState, useEffect, useCallback } from "react";
import css from "./App.module.css";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import {
  fetchNotes,
  type FetchNotesResponse,
} from "../../services/noteService";

const LoadingIndicator = () => <p className={css.loader}>Loading...</p>;

const ErrorNotice = ({ error }: { error: unknown }) => {
  const message = error instanceof Error ? error.message : "Unexpected error";
  return <p className={css.error}>{message}</p>;
};

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 12;
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [debouncedFilter] = useDebounce(filter, 400);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedFilter]);

  const getNotes = useCallback(
    () =>
      fetchNotes({
        page: pageNumber,
        perPage: itemsPerPage,
        search: debouncedFilter,
      }),
    [pageNumber, itemsPerPage, debouncedFilter]
  );

  const { data, isFetching, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", pageNumber, itemsPerPage, debouncedFilter],
    queryFn: getNotes,
    placeholderData: keepPreviousData,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const notes = data?.results ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={filter} onChange={setFilter} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={pageNumber}
            onPageChange={setPageNumber}
          />
        )}
        <button
          type="button"
          className={css.button}
          onClick={() => setShowModal(true)}
        >
          + Add note
        </button>
      </header>

      {isFetching && <LoadingIndicator />}
      {isError && <ErrorNotice error={error} />}

      {notes.length > 0 && <NoteList notes={notes} />}
      {!isFetching && !isError && notes.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onCancel={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
