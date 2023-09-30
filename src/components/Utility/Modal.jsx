import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import GridLoader from "react-spinners/GridLoader";

// Custom component to render HTML content safely
const RenderHTML = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);

const Modal = ({ modalStatus, title, message }) => {
  const modal = useRef(null);

  useEffect(() => {
    if (modalStatus) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [modalStatus]);

  return (
    <dialog open id="modal" ref={modal} className="rounded-lg p-10">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-fit bg-white rounded-lg">
          <div className="w-fit mx-auto">
            <GridLoader
              color={"#0284C7"}
              loading={modalStatus}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

          <div className="p-5 text-center space-y-4">
            <h2 className="text-3xl">{title}</h2>
            <div className="font-normal text-[18px] max-w-[350px]">
              <RenderHTML html={message} />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

Modal.propTypes = {
  modalStatus: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
