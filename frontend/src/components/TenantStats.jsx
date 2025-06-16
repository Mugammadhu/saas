import React from "react";
import { FaBuilding, FaCheckCircle, FaUser, FaClipboardList } from "react-icons/fa";

function TenantStats({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <FaBuilding className="stat-icon icon-purple" />
        <div className="stat-content">
          <span>Total Tenants</span>
          <h2>{stats.total}</h2>
        </div>
      </div>
      <div className="stat-card">
        <FaCheckCircle className="stat-icon icon-green" />
        <div className="stat-content">
          <span>Active Tenants</span>
          <h2>{stats.active}</h2>
        </div>
      </div>
      <div className="stat-card">
        <FaUser className="stat-icon icon-blue" />
        <div className="stat-content">
          <span>Avg Products/Tenant</span>
          <h2>{stats.avgProducts}</h2>
        </div>
      </div>
      <div className="stat-card">
        <FaClipboardList className="stat-icon icon-violet" />
        <div className="stat-content">
          <span>Total Features Enabled</span>
          <h2>{stats.totalFeatures}</h2>
        </div>
      </div>
    </div>
  );
}

export default TenantStats;
