import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoFilter } from './TodoFilter';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Todo {
    id: number;
    description: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [newTodo, setNewTodo] = useState<string>('');

    const addTodo = () => {
        if (newTodo.trim()) {
            const newTask = {
                id: Date.now(),
                description: newTodo,
                completed: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTask]);
            setNewTodo('');
        }
    };

    const toggleComplete = (id: number) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return updatedTodos;
        });
    };

    const deleteTodo = (id: number) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
            return updatedTodos;
        });
    };

    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === 'all') {
            return true;
        }
        if (filter === 'active') {
            return !todo.completed;
        }
        if (filter === 'completed') {
            return todo.completed;
        }
        return true;
    });

    return (
        <div>
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <TodoFilter filter={filter} setFilter={setFilter} />
            <ul>
                {filteredTodos.map((todo: Todo) => (
                    <TodoItem
                        key={todo.id}
                        deleteTodo={deleteTodo}
                        todo={todo}
                        toggleComplete={toggleComplete}
                    />
                ))}
            </ul>
        </div>
    );
};
