import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

function App() {
  const tasks = useQuery(api.tasks.getAllTasks) || [];
  const addTask = useMutation(api.tasks.addTask);
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask({ text: newTaskText });
      setNewTaskText("");
    }
  };

  const filteredTasks = tasks.filter((task: { status: string; }) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Ajouter</button>
      <div>
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("todo")}>À faire</button>
        <button onClick={() => setFilter("in-progress")}>En cours</button>
        <button onClick={() => setFilter("done")}>Terminées</button>
      </div>
      <div className="tasks">
        {filteredTasks.map((task: { _id: Key | null | undefined; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status: string | number | readonly string[] | undefined; }) => (
          <div key={task._id}>
            <span>{task.text}</span>
            <select
              value={task.status}
              onChange={(e) => {
                if (task._id) {
                  updateTaskStatus({ taskId: task._id as string, status: e.target.value });
                }
              }}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminée</option>
            </select>
            <button onClick={() => task._id && deleteTask({ taskId: task._id as string })}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;