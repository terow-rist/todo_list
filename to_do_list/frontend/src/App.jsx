import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks, UpdateTask, DeleteTask } from "../wailsjs/go/main/App";

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
                setTasks({
                    todo: data.filter(task => !task.Completed),
                    done: data.filter(task => task.Completed),
                });
                setSelectedTask(null); // Reset selection
            } else {
                console.error("Invalid task data:", data);
            }
        }).catch(console.error);
    };

    const addNewTask = (e) => {
        e.preventDefault();
        if (taskName.trim()) {
            AddTask(taskName).then(() => {
                setTaskName(""); 
                fetchTasks(); 
            }).catch(console.error);
        }
    };

    const selectTask = (task) => {
        setSelectedTask(prev => (prev?.ID === task.ID ? null : task));
    };
    
    const finishTask = () => {
        if (!selectedTask) return;
    
        UpdateTask(selectedTask.ID, true, selectedTask.Text).then(() => {
            fetchTasks(); 
        }).catch(console.error);
    };
    

    const deleteTask = () => {
        if (!selectedTask) return;
    
        DeleteTask(selectedTask.ID).then(() => {
            fetchTasks(); 
        }).catch(console.error);
    };
    
    

    const updateTask = () => {
        if (!selectedTask) return;
    
        const newTaskName = prompt("Enter new task name:", selectedTask.Text);
        if (newTaskName && newTaskName.trim() !== selectedTask.Text) {
            UpdateTask(selectedTask.ID, selectedTask.Completed, newTaskName).then(() => {
                fetchTasks(); 
            }).catch(console.error);
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

            <div className="button-group">
                <button className="btn finish-btn" onClick={finishTask} disabled={!selectedTask}>
                    Finish Task
                </button>
                <button className="btn update-btn" onClick={updateTask} disabled={!selectedTask}>
                    Edit Task
                </button>
                <button className="btn delete-btn" onClick={deleteTask} disabled={!selectedTask}>
                    Delete Task
                </button>
            </div>
        </div>
    );
}

export default App;
