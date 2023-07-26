import React from "react";
import Modal from "./Modal.jsx";
import { generalStyle, modalStyle } from "../styles";
import { useAppContext } from "../context/AppContext.jsx";

export default function EditTask() {
  const {
    editVisible,
    handleEditModal,
    textEntered,
    handleTextEntered,
    editTask,
    indexTaskEditable,
    tasks,
  } = useAppContext();

  const onChangeHandler = (event) =>
    handleTextEntered(event.target.value);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    editTask(indexTaskEditable, textEntered);
    handleEditModal();
    handleTextEntered("");
  };


console.log(tasks);


  return (
    <Modal onClose={handleEditModal} visible={editVisible} title="Edit Your Task">
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
            placeholder={tasks[indexTaskEditable]}
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
          Edit Task
        </button>
      </form>
    </Modal>
  );
}
