package main

import "fmt"

// Define Task struct
type Task struct {
	Text      string
	Completed bool
}

var tasks []Task // A slice to hold tasks in memory (you can use a database later)

// Function to add a new task
func AddTask(text string) {
	task := Task{Text: text, Completed: false}
	tasks = append(tasks, task)
	fmt.Println("Added task:", text)
}

// Function to retrieve tasks
func GetTasks() []Task {
	return tasks
}
