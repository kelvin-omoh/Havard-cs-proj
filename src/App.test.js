import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Line_item from './Line_item ';
import SearchItem from './SearchItem';


const mockItem = {
  id: 1,
  text: 'Test Task',
  checked: false,
  dueDate: new Date().toISOString()
};

const mockSearch = {
  search: "hello world",
};



const handleClick = jest.fn();
const handleDelete = jest.fn();

describe(App, () => {
  it('does total tasks render initially', () => {
    const { getByTestId } = render(<App />);
    const totalTasks = Number(getByTestId('total-tasks').textContent);
    expect(totalTasks).toBe(0);

  })

  it('the add task button should add a task', () => {
    const { getByRole, getByPlaceholderText, getByTestId } = render(<App />);
    const addTaskButton = getByRole('button', { name: /add task/i });
    const taskInput = getByPlaceholderText('What needs to be done?');
    const dateInput = getByTestId('date-input');

    // Simulate user input
    fireEvent.change(taskInput, { target: { value: 'New Task' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });

    // Simulate form submission
    fireEvent.click(addTaskButton);

    // Check if the task was added
    const totalTasks = Number(getByTestId('total-tasks').textContent);
    expect(totalTasks).toBe(1);
  });
})



describe('Line_item', () => {
  it('marks a task as completed', () => {
    render(<Line_item item={mockItem} handleClick={handleClick} handleDelete={handleDelete} />);

    const checkbox = screen.getByTestId('task-1');

    // Simulate checking the checkbox
    fireEvent.click(checkbox);

    // Verify if handleClick was called with the correct id
    expect(handleClick).toHaveBeenCalledWith(mockItem.id);
  });
});



describe('SearchItem', () => {
  it('updates the search input value', () => {
    const setSearch = jest.fn();
    const search = '';

    render(<SearchItem search={search} setSearch={setSearch} />);

    const searchInput = screen.getByPlaceholderText('search items');

    // Simulate user input
    fireEvent.change(searchInput, { target: { value: 'New Search' } });

    // Verify if setSearch was called with the correct value
    expect(setSearch).toHaveBeenCalledWith('New Search');
  });
});