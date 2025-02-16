package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) AddTask(text string) {
	AddTask(text)
	runtime.LogInfo(a.ctx, "Task added: "+text)
}

func (a *App) GetTasks() []Task {
	return GetTasks()
}

func (a *App) UpdateTask(id int, completed bool, newText string) {
	UpdateTask(id, completed, newText)
	runtime.LogInfo(a.ctx, "Task updated: "+newText)
}

func (a *App) DeleteTask(id int) {
	DeleteTask(id)
	runtime.LogInfo(a.ctx, "Task deleted")
}
