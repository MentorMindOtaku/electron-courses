import React from "react";
import { Plus } from "lucide-react";
import { generalStyle } from "./styles";
import { useAppContext } from "./context/AppContext.jsx";
import Task from "./components/Task.jsx";
import { CreateTask, EditTask } from "./components";

export default function App() {
  const { modalVisible, editVisible, handleModal, tasks } =
    useAppContext();

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
          <div
            onClick={handleModal}
            className={generalStyle.header.icon}
          >
            <Plus />
          </div>
        </header>

        {/* LIST TASK */}
        <main className="mt-8">
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
