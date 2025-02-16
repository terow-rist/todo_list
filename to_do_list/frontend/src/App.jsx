import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks, UpdateTask, DeleteTask } from "../wailsjs/go/main/App";

function App() {
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState(1); // Default priority
    const [tasks, setTasks] = useState({ todo: [], done: [] });
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        GetTasks()
            .then((data) => {
                if (Array.isArray(data)) {
                    setTasks({
                        todo: data.filter(task => !task.Completed),
                        done: data.filter(task => task.Completed),
                    });
                    setSelectedTask(null);
                } else {
                    console.error("Invalid task data:", data);
                }
            })
            .catch(console.error);
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (taskName.trim()) {
            AddTask(taskName, taskPriority)
                .then(() => {
                    setTaskName(""); 
                    setTaskPriority(1); // Reset priority
                    fetchTasks();
                })
                .catch(console.error);
        }
    };

    const selectTask = (task) => {
        setSelectedTask(prev => (prev?.ID === task.ID ? null : task));
    };

    const finishTask = () => {
        if (!selectedTask) return;

        UpdateTask(selectedTask.ID, true, selectedTask.Text, selectedTask.Priority)
            .then(fetchTasks)
            .catch(console.error);
    };

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToDelete(null);
    };

    const deleteTask = () => {
        if (!taskToDelete) return;

        DeleteTask(taskToDelete.ID)
            .then(() => {
                fetchTasks();
                closeModal();
            })
            .catch(console.error);
    };

    const updateTask = () => {
        if (!selectedTask) return;

        const newTaskName = prompt("Enter new task name:", selectedTask.Text);
        const newPriority = parseInt(prompt("Enter new priority (1-5):", selectedTask.Priority), 10);

        if (newTaskName && newTaskName.trim() !== selectedTask.Text && !isNaN(newPriority)) {
            UpdateTask(selectedTask.ID, selectedTask.Completed, newTaskName, newPriority)
                .then(fetchTasks)
                .catch(console.error);
        }
    };

    return (
        <div id="app">
            <h1>To Do List</h1>

            <div id="input" className="input-box">
                <input
                    id="taskName"
                    className="input"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter a new task"
                />
                <select
                    id="taskPriority"
                    className="priority-select"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(parseInt(e.target.value, 10))}
                >
                    {[1, 2, 3, 4, 5].map((p) => (
                        <option key={p} value={p}>
                            Priority {p}
                        </option>
                    ))}
                </select>
                <button className="btn" onClick={addNewTask}>Add</button>
            </div>

            <div id="taskSections">
                <div className="task-section">
                    <h2>To Do</h2>
                    {tasks.todo.length === 0 ? (
                        <p className="no-tasks">No tasks here</p>
                    ) : (
                        tasks.todo.map((task, index) => (
                            <div
                                key={index}
                                className={`task-box ${selectedTask?.ID === task.ID ? "selected" : ""}`}
                                onClick={() => selectTask(task)}
                            >
                                <p>{task.Text} (Priority {task.Priority})</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="task-section">
                    <h2>Done</h2>
                    {tasks.done.length === 0 ? (
                        <p className="no-tasks">No tasks here</p>
                    ) : (
                        tasks.done.map((task, index) => (
                            <div key={index} className="task-box done">
                                <p>{task.Text} (Priority {task.Priority})</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="button-group">
                <button className="btn finish-btn" onClick={finishTask} disabled={!selectedTask}>
                    Finish Task
                </button>
                <button className="btn update-btn" onClick={updateTask} disabled={!selectedTask}>
                    Edit Task
                </button>
                <button className="btn delete-btn" onClick={() => openDeleteModal(selectedTask)} disabled={!selectedTask}>
                    Delete Task
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete the task "{taskToDelete?.Text}"?</p>
                        <div className="modal-buttons">
                            <button onClick={deleteTask}>Delete</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
