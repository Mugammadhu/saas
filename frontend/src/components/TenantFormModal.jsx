import React from "react";
import { FiX } from "react-icons/fi";

function TenantFormModal({ show, formData, onChange, onClose, onSave, editMode }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close-icon" onClick={onClose}>
          <FiX />
        </button>
        <h3>{editMode ? "Edit Tenant" : "Add New Tenant"}</h3>
        <div className="form-grid">
          <label>
            Tenant Name
            <input name="name" value={formData.name} onChange={onChange} />
          </label>
          <label>
            Domain
            <input name="domain" value={formData.domain} onChange={onChange} />
          </label>
          <label>
            Email
            <input name="email" value={formData.email} onChange={onChange} />
          </label>
          <label>
            Plan
            <select name="plan" value={formData.plan} onChange={onChange}>
              <option>Free</option>
              <option>Starter</option>
              <option>Professional</option>
              <option>Enterprise</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" value={formData.status} onChange={onChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
          <label>
            Created Date
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={onChange}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>{editMode ? "Update" : "Save"} Tenant</button>
        </div>
      </div>
    </div>
  );
}

export default TenantFormModal;
