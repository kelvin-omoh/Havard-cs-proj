import React from 'react';
import { FaTrashAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Line_item = ({ handleClick, handleDelete, item }) => {
  const formatDueDate = (dueDate) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    const now = new Date();
    const isOverdue = date < now && !item.checked;

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const dateOptions = {
      month: 'short',
      day: 'numeric'
    };

    return (
      <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
        <FaClock className="clock-icon" />
        <span className="date-text">
          {date.toLocaleDateString(undefined, dateOptions)}
        </span>
        <span className="time-text">
          {date.toLocaleTimeString(undefined, timeOptions)}
        </span>
      </span>
    );
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`task-item ${item.checked ? 'completed' : ''}`}
    >
      <div className="task-content">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleClick(item.id)}
            id={`task-${item.id}`}
            className="custom-checkbox"
          />
          <label
            htmlFor={`task-${item.id}`}
            className="checkbox-label"
          >
            <FaCheckCircle className="check-icon" />
          </label>
        </div>

        <div className="task-details">
          <span className="task-text">{item.item}</span>
          {formatDueDate(item.dueDate)}
        </div>

        <button
          className="delete-btn"
          onClick={() => handleDelete(item.id)}
          aria-label="Delete task"
        >
          <FaTrashAlt />
        </button>
      </div>
    </motion.li>
  );
};

export default Line_item; 
