package main

import "fmt"

type Task struct {
	ID        int
	Text      string
	Completed bool
}

var tasks []Task
var taskCounter int

func AddTask(text string) {
	taskCounter++
	task := Task{ID: taskCounter, Text: text, Completed: false}
	tasks = append(tasks, task)
	fmt.Println("Added task:", text)
}

func UpdateTask(id int, completed bool) {
	for i, task := range tasks {
		if task.ID == id {
			tasks[i].Completed = completed
			fmt.Println("Updated task:", task.Text)
			return
		}
	}
}

func GetTasks() []Task {
	return tasks
}
