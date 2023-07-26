import React from "react";
import { Plus } from "lucide-react";
import { generalStyle } from "./styles";
import { useAppContext } from "./context/AppContext.jsx";
import Task from "./components/Task.jsx";
import { Button, CreateTask, EditTask } from "./components";

export default function App() {
  const {
    modalVisible,
    editVisible,
    handleModal,
    tasks,
    clearTasks,
  } = useAppContext();

  if (modalVisible) return <CreateTask />;
  if (editVisible) return <EditTask />;

  return (
    <div className={generalStyle.mainBackground}>
      <div className={generalStyle.container}>
        {/* HEADER */}
        <header className={generalStyle.header.container}>
          <h1 className={generalStyle.header.title}>
            Todo App
          </h1>

          {/* Edit this design */}

          <div className="flex gap-3">
            <Button onClick={clearTasks}>Clear all</Button>
            <div
              onClick={handleModal}
              className={generalStyle.header.icon}
            >
              <Plus />
            </div>
          </div>
        </header>

        {/* LIST TASK */}
        <main className="mt-8 grid gap-3">
          {tasks.length <= 0 ? (
            <p className={generalStyle.main.emptyTask}>
              Any task 🥲
            </p>
          ) : (
            tasks.map((task, index) => (
              <Task key={index} {...{ index, task }} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
