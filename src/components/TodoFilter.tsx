import React from 'react';

interface TodoFilterProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
    filter,
    setFilter,
}) => {
    return (
        <div>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
    );
};
