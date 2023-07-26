export default  {
  mainBackground: "bg-indigo-500 h-[100vh]",
  container: "container px-4 mx-auto",
  button:
    "w-full text-white bg-indigo-700 disabled:opacity-75 enabled:hover:bg-indigo-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center enabled:dark:bg-indigo-600 enabled:dark:hover:bg-indigo-700 enabled:dark:focus:ring-indigo-800",
  header: {
    container: "flex justify-between items-center",
    title:
      "mb-4 pt-5 text-4xl font-extrabold leading-none tracking-tight text-yellow-400 md:text-5xl lg:text-6xl",
    icon: "bg-white w-[max-content] p-2 rounded drop-shadow-md hover:drop-shadow-xl",
  },
  main: {
    emptyTask:
      "text-3xl font-extrabold md:text-4xl lg:text-5xl text-red-500 text-center mt-10",
  },
  modal: {
    modalBackground:
      "flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto h-[100vh] max-h-full",
    container: "relative w-full max-w-md max-h-full",
    wrapMainContent:
      "relative bg-transparent rounded-lg shadow dark:bg-gray-700",
    closeButton:
      "absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
    content: {
      container: "px-6 py-6 lg:px-8",
      title:
        "mb-4 text-xl font-medium text-gray-900 dark:text-white",
      form: "space-y-6",
      label:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      input:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
    },
  },
};

