import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

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

          <div key={task._id}>
            <span>{task.text}</span>
            <select
              value={task.status}
              onChange={(e) => {

              }}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminée</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;