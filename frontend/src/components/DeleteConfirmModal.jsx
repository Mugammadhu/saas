import React from "react";
import { FiX } from "react-icons/fi";

function DeleteConfirmModal({ show, onCancel, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close-icon" onClick={onCancel}>
          <FiX />
        </button>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this tenant? This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className="delete-confirm-btn">
            Delete Tenant
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
