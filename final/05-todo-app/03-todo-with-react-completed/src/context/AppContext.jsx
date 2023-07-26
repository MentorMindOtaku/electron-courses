import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AppProvider = createContext();

const getAllTasks = async (setTasks) => {
  const allItemsFromLocalStorage =
    await app.getLocationStorage();

  setTasks(allItemsFromLocalStorage);
};

export default function AppContext({ children }) {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [textEntered, setTextEntered] = useState("");
  const [indexTaskEditable, setIndexTaskEditable] =
    useState(undefined);

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);
  // Handle visibility of main modal
  const handleModal = () => setModalVisible(!modalVisible);

  // handle visibility of edit modal
  const handleEditModal = () =>
    setEditVisible(!editVisible);

  // Handle Input task
  const handleTextEntered = (text) => setTextEntered(text);

  // ============= Create a new task =============
  const handleTasks = (newState) => {
    app.createTask(newState);
    getAllTasks(setTasks);
    // setTasks([...tasks, newState]);
  };

  const handlerIndexTaskEditable = (index) =>
    setIndexTaskEditable(index);

  // ============= Edit a task =============
  // const editTask = (index, textEntered) => {
  //   setTasks((prevState) => {
  //     prevState[index] = textEntered;

  //     return prevState;
  //   });
  // };

  const editTask = (index, textEntered) => {
    app.editTask(indexTaskEditable, textEntered);
    getAllTasks(setTasks);
  };

  // ============= Delete a task =============
  // const deleteTask = (index) => {
  //   setTasks((products) =>
  //     products.filter(
  //       (_, indexFilter) => indexFilter !== index
  //     )
  //   );
  // };

  const deleteTask = (index) => {
    app.deleteTask(index);
    getAllTasks(setTasks);
  };

  const clearTasks = () => {
    app.deleteAllTasks();
    getAllTasks(setTasks);
  };
  return (
    <AppProvider.Provider
      value={{
        modalVisible,
        handleModal,
        editVisible,
        handleEditModal,
        textEntered,
        handleTextEntered,
        tasks,
        handleTasks,
        editTask,
        indexTaskEditable,
        handlerIndexTaskEditable,
        deleteTask,
        clearTasks
      }}
    >
      {children}
    </AppProvider.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppProvider);

  return value;
}
