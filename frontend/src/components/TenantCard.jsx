import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

function TenantCard({ tenant, onEdit, onDelete, onManageProducts }) {
  const getAvatarLetters = (name) => {
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  const getPlanClass = (plan) => {
    switch (plan.toLowerCase()) {
      case "free":
        return "free";
      case "starter":
        return "starter";
      case "professional":
        return "professional";
      case "enterprise":
        return "enterprise";
      default:
        return "gray";
    }
  };

  return (
    <div className="tenant-card">
      <div className="tenant-top">
        <div className="tenant-avatar">{getAvatarLetters(tenant.name)}</div>
        <div className="tenant-name-domain">
          <strong>{tenant.name}</strong>
          <p>{tenant.domain}</p>
        </div>
      </div>
      <div className="tenant-row tenant-meta-row">
        <div className="tenant-left-tags">
          <span className={tenant.status === "Active" ? "tag green" : "tag gray"}>
            {tenant.status}
          </span>
          <span className={`tag ${getPlanClass(tenant.plan)}`}>{tenant.plan}</span>
        </div>
        <div className="tenant-right-products">
          {tenant.features.length} Products
        </div>
      </div>
      <div className="tenant-divider" />
      <div className="tenant-actions-row">
        <span className="manage-link" onClick={onManageProducts}>
          Manage Products
        </span>
        <div className="icon-actions">
          <MdEdit className="edit" onClick={onEdit} />
          <MdDelete className="delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default TenantCard;
