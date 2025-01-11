import { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './App.css';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Notification from './components/Notification';
import Timer from './components/Timer';

function App() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("shoppinglist")) || []);
  const [newItem, setNewItem] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [notification, setNotification] = useState(null);

  // Check for due tasks
  useEffect(() => {
    const checkDueTasks = setInterval(() => {
      const now = new Date();
      items.forEach(item => {
        if (item.dueDate && !item.checked) {
          const dueDate = new Date(item.dueDate);
          // Check if task is due within 5 minutes
          const timeDiff = dueDate - now;
          if (timeDiff > 0 && timeDiff <= 300000) { // 5 minutes in milliseconds
            showNotification(`Task "${item.item}" is due in ${Math.ceil(timeDiff / 60000)} minutes!`, 'warning');
          } else if (timeDiff < 0 && timeDiff > -300000) { // Just passed due
            showNotification(`Task "${item.item}" is overdue!`, 'error');
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkDueTasks);
  }, [items]);

  // Stats calculations
  const totalItems = items.length;
  const completedItems = items.filter(item => item.checked).length;
  const pendingItems = totalItems - completedItems;
  const overdueItems = items.filter(item =>
    item.dueDate && !item.checked && new Date(item.dueDate) < new Date()
  ).length;

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const setAndSaveitems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const additem = (item, dueDate) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      id,
      item,
      checked: false,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString()
    };
    const listItems = [...items, myNewItem];
    setAndSaveitems(listItems);
    showNotification('Task added successfully!', 'success');
  };

  const handleClick = (id) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, checked: !item.checked };
        if (updatedItem.checked) {
          showNotification('Task completed!', 'success');
        }
        return updatedItem;
      }
      return item;
    });
    setAndSaveitems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveitems(listItems);
    showNotification('Task deleted!', 'error');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      showNotification('Please enter a task!', 'error');
      return;
    }
    additem(newItem, newDueDate);
    setNewItem("");
    setNewDueDate("");
  };

  return (
    <div className="App">
      <Header title="Task Dashboard" />

      <div className="notification-container">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>

      <main>
        <Timer />

        <div className="dashboard-grid">
          <div className="stats-card">
            <h3>Total Tasks</h3>
            <p data-testid="total-tasks">{totalItems}</p>
          </div>
          <div className="stats-card">
            <h3>Completed</h3>
            <p>{completedItems}</p>
          </div>
          <div className="stats-card">
            <h3>Pending</h3>
            <p>{pendingItems}</p>
          </div>
          <div className="stats-card warning">
            <h3>Overdue</h3>
            <p>{overdueItems}</p>
          </div>
        </div>

        <div className="task-container">
          <div className="task-header">
            <h2>Tasks</h2>
          </div>

          <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            newDueDate={newDueDate}
            setNewDueDate={setNewDueDate}
            handleSubmit={handleSubmit}
          />

          <SearchItem
            search={search}
            setSearch={setSearch}
          />

          <Content
            items={items.filter(item =>
              ((item.item).toLowerCase()).includes(search.toLowerCase())
            )}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />
        </div>
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
