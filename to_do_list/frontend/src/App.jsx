import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks, UpdateTask } from "../wailsjs/go/main/App";

function App() {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState({ todo: [], done: [] });
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
    GetTasks().then((data) => {
        if (Array.isArray(data)) {
            const todoTasks = data.filter(task => !task.Completed);
            const doneTasks = data.filter(task => task.Completed);
            
            setTasks({ todo: todoTasks, done: doneTasks });

            // Ensure selectedTask remains valid or gets reset
            setSelectedTask(prev => 
                prev && todoTasks.some(task => task.Text === prev.Text) ? prev : null
            );
        } else {
            console.error("Invalid task data:", data);
        }
    }).catch(console.error);
};


    const addNewTask = (e) => {
        e.preventDefault();
        if (taskName.trim()) {
            AddTask(taskName).then(() => {
                setTaskName(""); // Clear input
                fetchTasks(); // Refresh tasks
            }).catch(console.error);
        }
    };

    const selectTask = (task) => {
        setSelectedTask(prev => (prev?.Text === task.Text ? null : task));
    };

    const finishTask = () => {
        if (!selectedTask) return;

        UpdateTask(selectedTask.Text, true).then(() => {
            fetchTasks(); // Refresh list
        }).catch(console.error);
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
                                className={`task-box ${selectedTask?.Text === task.Text ? "selected" : ""}`}
                                onClick={() => selectTask(task)}
                            >
                                <p>{task.Text}</p>
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
                                <p>{task.Text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <button className="btn finish-btn" onClick={finishTask} disabled={!selectedTask}>
                Finish Task
            </button>
        </div>
    );
}

export default App;
