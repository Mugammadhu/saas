import React from "react";
import { FiX } from "react-icons/fi";

function ManageProductsModal({
  show,
  tenant,
  featureGroups,
  selectedFeatures,
  toggleFeature,
  onClose,
  onSave,
}) {
  if (!show) return null;

  return (
    <div className="manage-products-backdrop">
      <div className="manage-products-modal">
        <button className="manage-products-close" onClick={onClose}>
          <FiX />
        </button>
        <h3>Manage Products for {tenant?.name}</h3>

        {Object.entries(featureGroups).map(([section, items]) => (
          <div key={section} className="product-section">
            <h4>{section}</h4>
            {items.map((feat) => (
              <div key={feat.id} className="product-item">
                <span>{feat.label}</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feat.id)}
                    onChange={() => toggleFeature(feat.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="manage-products-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="done-btn" onClick={onSave}>
            Save Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageProductsModal;
