import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle color="var(--success-color)" />;
            case 'error':
                return <FaExclamationCircle color="var(--danger-color)" />;
            case 'warning':
                return <FaExclamationTriangle color="var(--warning-color)" />;
            default:
                return null;
        }
    };

    return (
        <div className={`notification ${type}`}>
            {getIcon()}
            <span>{message}</span>
        </div>
    );
};

export default Notification; 