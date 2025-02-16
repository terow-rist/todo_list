import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks } from "../wailsjs/go/main/App";

function App() {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const updateTaskName = (e) => setTaskName(e.target.value);

    const fetchTasks = () => {
        GetTasks().then((data) => {
            console.log("Fetched tasks:", data);
            if (Array.isArray(data)) {
                setTasks({ todo: data, inProgress: [], done: [] });
            } else {
                console.error("GetTasks() returned non-array:", data);
                setTasks({ todo: [], inProgress: [], done: [] });
            }
        }).catch((error) => console.error("Error fetching tasks:", error));
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (taskName.trim()) {
            AddTask(taskName).then(() => {
                setTaskName("");
                fetchTasks();
            }).catch((error) => console.error("Error adding task:", error));
        }
    };

    const handleDragStart = (task, fromSection) => {
        setDraggedTask({ task, fromSection });
    };

    const handleDrop = (toSection) => {
        if (!draggedTask) return;

        const updatedTasks = { ...tasks };
        const { task, fromSection } = draggedTask;

        // Remove task from the previous section
        updatedTasks[fromSection] = updatedTasks[fromSection].filter(t => t !== task);

        // Add task to the new section
        updatedTasks[toSection].push(task);

        setTasks(updatedTasks);
        setDraggedTask(null);
    };

    return (
        <div id="app">
            <h1>To Do List</h1>

            <div id="input" className="input-box">
                <input
                    id="taskName"
                    className="input"
                    value={taskName}
                    onChange={updateTaskName}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter a new task"
                />
                <button className="btn" onClick={addNewTask}>Add</button>
            </div>

            <div id="taskSections">
                {["todo", "inProgress", "done"].map((section) => (
                    <div
                        key={section}
                        className="task-section"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(section)}
                    >
                        <h2>{section === "todo" ? "To Do" : section === "inProgress" ? "In Progress" : "Done"}</h2>
                        {tasks[section].length === 0 ? (
                            <p className="no-tasks">No tasks here</p>
                        ) : (
                            tasks[section].map((task, index) => (
                                <div
                                    key={index}
                                    className="task-box"
                                    draggable
                                    onDragStart={() => handleDragStart(task, section)}
                                >
                                    <p>{task}</p>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
