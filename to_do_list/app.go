package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx   context.Context
	tasks []Task
}

func NewApp() *App {
	return &App{
		tasks: []Task{},
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) AddTask(text string) {
	newTask := Task{Text: text, Completed: false}
	a.tasks = append(a.tasks, newTask) // Append new task
	runtime.LogInfo(a.ctx, "Task added: "+text)
}

func (a *App) GetTasks() []Task {
	return a.tasks
}

func (a *App) UpdateTask(text string, completed bool) {
	for i, task := range a.tasks {
		if task.Text == text {
			a.tasks[i].Completed = completed
			runtime.LogInfo(a.ctx, "Task updated: "+text)
			return
		}
	}
}

func (a *App) DeleteTask(text string) {
	for i, task := range a.tasks {
		if task.Text == text {
			a.tasks = append(a.tasks[:i], a.tasks[i+1:]...) // Remove task
			runtime.LogInfo(a.ctx, "Task deleted: "+text)
			return
		}
	}
}
