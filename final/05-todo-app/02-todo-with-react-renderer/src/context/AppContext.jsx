import React, {
  createContext,
  useContext,
  useState,
} from "react";

export const AppProvider = createContext();

export default function AppContext({ children }) {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [textEntered, setTextEntered] = useState("");
  const [indexTaskEditable, setIndexTaskEditable] =
    useState(undefined);

  const handleModal = () => setModalVisible(!modalVisible);
  const handleEditModal = () =>
    setEditVisible(!editVisible);
  const handleTextEntered = (text) => setTextEntered(text);
  const handleTasks = (newState) =>
    setTasks([...tasks, newState]);

  const handlerIndexTaskEditable = (index) =>
    setIndexTaskEditable(index);

  const editTask = (index, textEntered) =>
    setTasks((prevState) => {
      prevState[index] = textEntered;

      return prevState;
    });

  const deleteTask = (index) =>
    setTasks((products) =>
      products.filter(
        (_, indexFilter) => indexFilter !== index
      )
    );

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
