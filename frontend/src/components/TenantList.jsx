import React from "react";
import TenantCard from "./TenantCard";

function TenantList({ tenants, onEdit, onDelete, onManageProducts }) {
  return (
    <div className="tenant-list">
      {tenants.map((tenant) => (
        <TenantCard
          key={tenant._id}
          tenant={tenant}
          onEdit={() => onEdit(tenant)}
          onDelete={() => onDelete(tenant._id)}
          onManageProducts={() => onManageProducts(tenant)}
        />
      ))}
    </div>
  );
}

export default TenantList;
