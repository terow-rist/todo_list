package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx   context.Context
	tasks []string // Store tasks in a slice
}

// NewApp creates a new App instance
func NewApp() *App {
	return &App{
		tasks: []string{}, // Initialize an empty slice
	}
}

// App startup (stores context for logging)
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// AddTask adds a new task to the list
func (a *App) AddTask(text string) {
	a.tasks = append(a.tasks, text) // Append new task
	runtime.LogInfo(a.ctx, "Task added: "+text)
}

// GetTasks returns all tasks as a slice
func (a *App) GetTasks() []string {
	return a.tasks
}
