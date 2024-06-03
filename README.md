Installation:
git clone https://github.com/LaptiiDina/TodoList.git

Install the dependencies:
npm install or npm i

Usage
Start the development server: npm start

To build the project for production:
npm run build

TodoList
The main component that renders the list of todos and handles adding, toggling, and deleting todos.


TodoItem
A component that renders a single todo item with options to toggle its completion status.
Props:
todo: An object representing a todo with id, description, and completed properties.
toggleComplete: Function to toggle the completion status of the todo.
deleteTodo: Function to delete tasks from todo list and local storage

TodoFilter
A component that allows filtering the todos based on their completion status.
Props:
filter: The current filter status ('all' | 'active' | 'completed').
setFilter: Function to set the filter status.

Testing
To run the tests: npm test

Available Tests:
Adding new tasks
Marking tasks as completed
Filtering tasks
Filter active tasks
Persist state between reloads
Adding multiple tasks

todo-list-mfe/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── TodoItem.tsx
│   │   ├── TodoFilter.tsx
│   │   └── TodoList.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── tests/
│   │   └── TodoList.test.tsx
│   ├── index.tsx
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json

Notes
Ensure that node_modules is not included when sending the application for review.
All required dependencies should be listed in package.json.



