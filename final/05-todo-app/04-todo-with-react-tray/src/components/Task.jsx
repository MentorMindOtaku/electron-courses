import React from "react";
import { Button } from "./index";
import { Pen, Trash } from "lucide-react";
import { taskStyle } from "../styles";
import { useAppContext } from "../context/AppContext.jsx";

export default function Task({ task, index }) {
  const {
    handleEditModal,
    handlerIndexTaskEditable,
    deleteTask,
  } = useAppContext();

  const editHandler = () => {
    handlerIndexTaskEditable(index);
    handleEditModal();
  };

  const deleteHandler = () => deleteTask(index);

  return (
    <div className={taskStyle.container}>
      <p className={taskStyle.task}>{task}</p>

      <div className={taskStyle.buttons.container}>
        <Button
          type="button"
          customClass={taskStyle.buttons.edit}
          onClick={editHandler}
        >
          <div className={taskStyle.buttons.wrapContent}>
            <Pen />
            <p>Edit</p>
          </div>
        </Button>

        <Button
          type="button"
          customClass={taskStyle.buttons.delete}
          onClick={deleteHandler}
        >
          <div className={taskStyle.buttons.wrapContent}>
            <Trash />
            <p>Delete</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
