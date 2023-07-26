import React from "react";
import Modal from "./Modal.jsx";
import { modalStyle, generalStyle } from "../styles";
import { useAppContext } from "../context/AppContext.jsx";

export default function CreateTask() {
  const {
    modalVisible,
    handleModal,
    textEntered,
    handleTextEntered,
    handleTasks,
  } = useAppContext();

  const onChangeHandler = (event) =>
    handleTextEntered(event.target.value);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    handleTasks(textEntered);
    handleModal();
    handleTextEntered("");
  };

  return (
    <Modal
      visible={modalVisible}
      onClose={handleModal}
      title="Create New Task"
    >
      <form className={modalStyle.content.form}>
        <div>
          <label
            htmlFor="task"
            className={modalStyle.content.label}
          >
            Your task
          </label>
          <input
            onChange={onChangeHandler}
            value={textEntered}
            type="text"
            name="task"
            id="task"
            className={modalStyle.content.input}
            placeholder="add a new task..."
            autoFocus
            required
          />
        </div>

        <button
          onClick={onSubmitHandler}
          type="submit"
          disabled={!textEntered}
          className={
            !textEntered
              ? `${generalStyle.button} cursor-not-allowed`
              : generalStyle.button
          }
        >
          Create New Task
        </button>
      </form>
    </Modal>
  );
}
