import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface Props extends PropsWithChildren {
  onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  const root = document.getElementById("modal-root") || document.body;
  const pressedOnBackdrop = useRef(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = oldOverflow;
    };
  }, [onClose]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    pressedOnBackdrop.current = e.currentTarget === e.target;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pressedOnBackdrop.current && e.currentTarget === e.target) {
      onClose();
    }
    pressedOnBackdrop.current = false;
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    root
  );
};

export default Modal;
