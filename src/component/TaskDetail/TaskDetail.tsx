import React from "react";
import Modal from "react-modal";
import EventForm from "../EventForm/EventForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },

  greyout: {
    backgroundColor: "lightgrey",
  },
};

function TaskModal({
  isOpenProp,
  closeModalProp,
  onAfterOpenProp,
  payloadProp,
}: any) {
  let modal;

  switch (isOpenProp) {
    case "event":
      modal = (
        <Modal
          isOpen={isOpenProp && true}
          onRequestClose={closeModalProp}
          style={customStyles}
        >
          <form>
            <p>Title: {payloadProp.event_obj.title}</p>
            <p>Description: {payloadProp.event_obj.description}</p>

            {payloadProp.duration && (
              <div>
                {" "}
                <p>start: {payloadProp.event_obj.duration[0]}</p>
                <p>end: {payloadProp.event_obj.duration[1]}</p>
              </div>
            )}
          </form>
        </Modal>
      );
      break;

    default:
      // add new modal.
      modal = (
        <Modal
          isOpen={isOpenProp && true}
          style={customStyles}
          onAfterOpen={onAfterOpenProp}
          onRequestClose={closeModalProp}
        >
          <EventForm
            payloadProp={payloadProp}
            closeModalProp={closeModalProp}
          />
        </Modal>
      );
      break;
  }

  return isOpenProp && modal;
  // return <p>asdfds</p>;
}

export default TaskModal;
