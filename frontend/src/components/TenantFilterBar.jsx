import React from "react";
import { FiSearch } from "react-icons/fi";

function TenantFilterBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, productFilter, setProductFilter, featureGroups }) {
  return (
    <div className="filter-wrapper">
      <div className="filter-bar">
        <div className="search-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-selects">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
            <option value="All">All Products</option>
            {Object.values(featureGroups).flat().map((product) => (
              <option key={product.id} value={product.id}>{product.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TenantFilterBar;
