import React, { useRef, useState } from 'react';
import { IoMdSend, IoMdCalendar, IoMdAdd } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const AddItem = ({ newItem, setNewItem, newDueDate, setNewDueDate, handleSubmit }) => {
  const inputRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="add-task-container"
    >
      <form className='addForm' onSubmit={handleSubmitForm}>
        <div className="input-group-container">
          <div className="input-icon">
            <IoMdAdd className="add-icon" />
          </div>
          <div className="input-fields">
            <input
              type="text"
              placeholder='What needs to be done?'
              autoFocus
              ref={inputRef}
              id='additem'
              required
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onFocus={handleFocus}
              className="task-input"
            />
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="datetime-container"
                >
                  <div className="datetime-wrapper">
                    <IoMdCalendar className="calendar-icon" />
                    <input
                      type="datetime-local"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="datetime-input"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            type='submit'
            onClick={() => inputRef.current.focus()}
            aria-label='Add task'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-button"
          >
            <IoMdSend className="send-icon" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddItem;
