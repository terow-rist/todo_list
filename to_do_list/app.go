package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx        context.Context
	repository TaskRepository
}

func NewApp() *App {
	return &App{repository: NewSQLiteRepository()}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) AddTask(text string, priority int) {
	err := a.repository.AddTask(text, priority)
	if err != nil {
		runtime.LogError(a.ctx, "Failed to add task: "+err.Error())
		return
	}
	runtime.LogInfo(a.ctx, "Task added: "+text)
}

func (a *App) GetTasks() []Task {
	tasks, err := a.repository.GetTasks()
	if err != nil {
		runtime.LogError(a.ctx, "Failed to get tasks: "+err.Error())
		return nil
	}
	return tasks
}

func (a *App) UpdateTask(id int, completed bool, newText string, priority int) {
	err := a.repository.UpdateTask(id, priority, completed, newText)
	if err != nil {
		runtime.LogError(a.ctx, "Failed to update task: "+err.Error())
		return
	}
	runtime.LogInfo(a.ctx, "Task updated: "+newText)
}

func (a *App) DeleteTask(id int) {
	err := a.repository.DeleteTask(id)
	if err != nil {
		runtime.LogError(a.ctx, "Failed to delete task: "+err.Error())
		return
	}
	runtime.LogInfo(a.ctx, "Task deleted")
}
