import React, { useState, useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide the toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message && (
      <div className={`toast ${type}`}>
        <p>{message}</p>
      </div>
    )
  );
};

export default Toast;
