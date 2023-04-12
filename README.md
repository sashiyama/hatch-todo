# Simple To-Do List App

This is a simple to-do list app built using React and TypeScript for the frontend, Node.js for the backend, and PostgreSQL for the database.
The app is containerized using Docker and can be deployed using `docker-compose`.

## Features

- Create new todo items
- Mark todo items as completed
- Delete todo items
- Filter todo items by search
- Automatically sync with the backend every minute

## Prerequisites

- Docker and docker-compose installed on your machine
- Node.js (Optional, for development purposes)

## Getting Started

1. Clone the repository:

```
$ git clone https://github.com/sashiyama/hatch-todo.git
```


2. Navigate to the project directory:

```
$ cd your-repo
```


3. Run the app using Docker:

```
$ docker-compose up
```


This command will build and run the frontend, backend, and database containers.
The frontend will be accessible at `http://localhost:3000` and the backend at `http://localhost:5000`.


The frontend development server will be accessible at `http://localhost:3000` and the backend development server at `http://localhost:5000`.

## Contributing

Feel free to submit issues, feature requests, and pull requests to contribute to the project. We appreciate your valuable input!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
