package main

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Task struct {
	ID        int `gorm:"primaryKey"`
	Text      string
	Completed bool
	Priority  int
}

type TaskRepository interface {
	AddTask(text string, priority int) error
	GetTasks() ([]Task, error)
	UpdateTask(id, priority int, completed bool, newText string) error
	DeleteTask(id int) error
}

type SQLiteRepository struct {
	db *gorm.DB
}

func NewSQLiteRepository() *SQLiteRepository {
	db, err := gorm.Open(sqlite.Open("tasks.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	db.AutoMigrate(&Task{})
	return &SQLiteRepository{db: db}
}

func (r *SQLiteRepository) AddTask(text string, priority int) error {
	task := Task{Text: text, Completed: false, Priority: priority}
	return r.db.Create(&task).Error
}

func (r *SQLiteRepository) GetTasks() ([]Task, error) {
	var tasks []Task
	err := r.db.Find(&tasks).Error
	return tasks, err
}

func (r *SQLiteRepository) UpdateTask(id, priority int, completed bool, newText string) error {
	return r.db.Model(&Task{}).Where("id = ?", id).Updates(Task{Completed: completed, Text: newText, Priority: priority}).Error
}

func (r *SQLiteRepository) DeleteTask(id int) error {
	return r.db.Delete(&Task{}, id).Error
}
