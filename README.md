# To-Do List Application

This repository contains a To-Do List desktop application built with [Wails](https://wails.io/), combining a Go backend with a React frontend. The application allows users to manage tasks with functionalities to add, update, complete, and delete tasks.

## Features

- **Add Tasks**: Create new tasks with a specified priority.
- **View Tasks**: Display tasks categorized as 'To Do' and 'Done'.
- **Update Tasks**: Edit task details, including text, completion status, and priority.
- **Delete Tasks**: Remove tasks from the list.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Go](https://golang.org/doc/install) (version 1.16 or later)
- [Node.js](https://nodejs.org/) (version 14 or later)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)

## Getting Started

Follow these steps to set up and run the application:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/terow-rist/todo_list.git
   cd todo_list
   and into workspace
   cd to_do_list
   ```

2. **Install Dependencies**:

   - Install Go dependencies:

     ```bash
     go mod tidy
     ```

   - Install frontend dependencies:

     ```bash
     cd frontend
     npm install
     cd ..
     ```

3. **Run in Development Mode**:

   Start the application in live development mode:

   ```bash
   wails dev
   ```

   This command runs a Vite development server, enabling hot reload for frontend changes. You can also access the development server in a browser at `http://localhost:34115` to interact with Go methods via devtools.

4. **Build for Production**:

   To create a production build of the application:

   ```bash
   wails build
   ```

   The build output will be located in the `build/bin` directory.

## Project Structure

- **`/frontend`**: Contains the React frontend code.
- **`/go`**: Contains the Go backend code, including:
  - `app.go`: Defines the main application structure and methods.
  - `repository.go`: Manages database interactions using GORM with SQLite.

## Database

The application uses SQLite for data storage, managed through GORM. Upon initialization, a `tasks.db` file is created in the application directory. The `Task` model includes the following fields:

- `ID`: Unique identifier for each task.
- `Text`: Description of the task.
- `Completed`: Boolean indicating if the task is completed.
- `Priority`: Integer representing the task's priority level.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

## Acknowledgements

- [Wails](https://wails.io/) for providing the framework to build Go and web-based desktop apps.
- [GORM](https://gorm.io/) for the ORM library used for database interactions.
- [React](https://reactjs.org/) for the frontend library.

For more information, refer to the [Wails documentation](https://wails.io/docs/) and the [GORM guides](https://gorm.io/docs/). 
