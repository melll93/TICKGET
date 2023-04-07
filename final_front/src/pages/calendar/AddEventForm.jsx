import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";

function AddEventForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add new event here
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>일정 추가</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Event Modal"
      >
        <form onSubmit={handleSubmit}>
          <h3>일정 추가</h3>
          <div>
            <label>Title:</label>
            &nbsp;
            <input type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label>Description:</label>
            &nbsp;
            <textarea value={description} onChange={handleDescriptionChange} />
          </div>
          <div>
            <label>Date:</label>
            &nbsp;
            <input type="text" value={moment(props.date).format("YYYY-MM-DD")} readOnly />
          </div>
          <button type="submit">Save</button>
          &nbsp;
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </>
  );
}

export default AddEventForm;