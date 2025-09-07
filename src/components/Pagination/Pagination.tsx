import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (next: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  const handlePage = (e: { selected: number }) => onPageChange(e.selected + 1);

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={handlePage}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
    />
  );
};

export default Pagination;
