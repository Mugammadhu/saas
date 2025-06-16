import React from "react";
import logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";

function TenantHeader({ onLogout, onAdd }) {
  return (
    <header className="dashboard-header">
      <div className="header-title">
        <img src={logo} alt="Company Logo" className="dashboard-logo" />
        <h2>SaaS Tenant Manager</h2>
      </div>
      <div className="header-actions">
        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
        <button className="add-button" onClick={onAdd}>
          + Add Tenant
        </button>
      </div>
    </header>
  );
}

export default TenantHeader;
