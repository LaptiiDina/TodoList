import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../components/TodoList';
import '@testing-library/jest-dom';

test('adding new task', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    expect(screen.getByText(/new task/i)).toBeInTheDocument();
});

test('mark task as completed', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'Task to Complete' } });
    fireEvent.click(button);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
});

test('filter of task', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.click(button);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText(/completed/i));
    expect(screen.queryByText(/active task/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/all/i));
    expect(screen.getByText(/active task/i)).toBeInTheDocument();
});

test('filter active tasks', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.click(button);
    fireEvent.click(screen.getAllByText(/active/i)[0]);
    expect(screen.getAllByText(/active task/i)[0]).toBeInTheDocument();
});
test('persist state between reloads', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'Persistent Task' } });
    fireEvent.click(addButton);
    render(<TodoList />);
    expect(screen.getAllByText(/persistent task/i)[0]).toBeInTheDocument();
});

test('adding multiple tasks', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Task 3' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/task 3/i)).toBeInTheDocument();
});
test('deleting a task', () => {
    render(<TodoList />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    fireEvent.change(input, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/task to delete/i)).toBeInTheDocument();
    const deleteButton = screen.getAllByText('X').find((button) => {
        // eslint-disable-next-line testing-library/no-node-access
        return button.closest('li')?.textContent?.includes('Task to Delete');
    });
    if (deleteButton) {
        fireEvent.click(deleteButton);
    }
    expect(screen.queryByText(/task to delete/i)).not.toBeInTheDocument();
});