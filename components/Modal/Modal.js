import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if(isBrowser) {
      show ?
        document.querySelector("body").classList.add("fix") :
        document.querySelector("body").classList.remove("fix");
    }
  });

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__header">
          <a href="#" onClick={handleCloseClick}>
            <i className="icon icon-close"></i>
          </a>
        </div>
        {title && <div className="modal__title">{title}</div>}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
