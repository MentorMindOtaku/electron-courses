import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { X } from "lucide-react";
import { modalStyle } from "../styles";
import general from "../styles/general.js";

export default function Modal({
  children,
  title,
  visible,
  onClose,
}) {
  return (
    <>
      <div
        aria-hidden={visible}
        className={modalStyle.modalBackground}
      >
        <div className={modalStyle.container}>
          {/* Content */}
          <div className={modalStyle.wrapMainContent}>
            <button
              type="button"
              className={modalStyle.closeButton}
              onClick={onClose}
            >
              <X />
              <span className="sr-only">Close modal</span>
            </button>
            <div className={modalStyle.content.container}>
              <h3 className={modalStyle.content.title}>
                {title}
              </h3>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
