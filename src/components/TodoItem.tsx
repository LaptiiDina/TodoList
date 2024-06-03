import React from 'react';

interface TodoItemProps {
    todo: { id: number; description: string; completed: boolean };
    toggleComplete: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={()=>toggleComplete(todo.id)}
            />
            <span
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                }}
            >
                {todo.description}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
        </li>
    );
};