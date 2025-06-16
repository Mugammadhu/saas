/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TenantHeader from "./TenantHeader";
import TenantFilterBar from "./TenantFilterBar";
import TenantStats from "./TenantStats";
import TenantList from "./TenantList";
import TenantFormModal from "./TenantFormModal";
import ManageProductsModal from "./ManageProductsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Notification from "../components/Notification";
import "../styles/TenantDashboard.css";
const apiUrl = import.meta.env.VITE_API_URL;

const FEATURE_GROUPS = {
  Analytics: [
    { id: "bi", label: "BI Reporting" },
    { id: "dashboards", label: "Custom Dashboards" },
    { id: "scheduled", label: "Scheduled Reports" },
  ],
  Marketing: [
    { id: "automation", label: "Automation & Campaigns" },
    { id: "lead_score", label: "Lead Scoring" },
  ],
  Support: [
    { id: "tickets", label: "Support Tickets" },
    { id: "live_chat", label: "Live Chat" },
  ],
};

function TenantDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [stats, setStats] = useState({ total: 0, active: 0, avgProducts: 0, totalFeatures: 0 });

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: "", domain: "", email: "", plan: "Free", status: "Active", createdAt: new Date().toISOString().split("T")[0],
  });

  const [notification, setNotification] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  useEffect(() => { fetchTenants(); }, []);
  useEffect(() => { applyFilters(); }, [searchTerm, statusFilter, productFilter, tenants]);

  const fetchTenants = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/tenants`, { headers: { Authorization: `Bearer ${token}` } });
      const tenantList = res.data.map(t => ({ ...t, features: t.features || [] }));
      setTenants(tenantList);
    } catch (err) { showNotification("Failed to load tenants", "error"); }
  };

  const applyFilters = () => {
    let filtered = [...tenants];
    if (searchTerm.trim()) {
      filtered = filtered.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    if (productFilter !== "All") {
      filtered = filtered.filter(t => t.features.includes(productFilter));
    }
    const total = filtered.length;
    const active = filtered.filter(t => t.status.toLowerCase() === "active").length;
    const totalFeatures = filtered.reduce((sum, t) => sum + (t.features?.length || 0), 0);
    const avgProducts = total ? (totalFeatures / total).toFixed(1) : 0;
    setFilteredTenants(filtered);
    setStats({ total, active, avgProducts, totalFeatures });
  };

  const openAddForm = () => {
    setFormData({ name: "", domain: "", email: "", plan: "Free", status: "Active", createdAt: new Date().toISOString().split("T")[0] });
    setEditMode(false);
    setShowForm(true);
  };

  const openEditForm = (tenant) => {
    setSelectedTenant(tenant);
    setEditMode(true);
    setFormData({
      name: tenant.name || "", domain: tenant.domain || "", email: tenant.email || "",
      plan: tenant.plan || "Free", status: tenant.status || "Active",
      createdAt: tenant.createdAt?.split("T")[0] || new Date().toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(`${apiUrl}/api/tenants/${selectedTenant._id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        showNotification("Tenant updated successfully", "success");
      } else {
        await axios.post(`${apiUrl}/api/tenants`, formData, { headers: { Authorization: `Bearer ${token}` } });
        showNotification("Tenant added successfully", "success");
      }
      setShowForm(false);
      fetchTenants();
    } catch (err) {
      showNotification("Failed to save tenant", "error");
    }
  };

  const openProductModal = (tenant) => {
    setSelectedTenant(tenant);
    setSelectedFeatures(tenant.features || []);
    setProductModalOpen(true);
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((f) => f !== featureId) : [...prev, featureId]
    );
  };

  const saveFeatures = async () => {
    try {
      await axios.put(`${apiUrl}/api/tenants/${selectedTenant._id}`, { features: selectedFeatures }, { headers: { Authorization: `Bearer ${token}` } });
      showNotification("Products updated successfully", "success");
      setProductModalOpen(false);
      fetchTenants();
    } catch (err) {
      showNotification("Failed to update products", "error");
    }
  };

  const handleDelete = (id) => {
    setTenantToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/tenants/${tenantToDelete}`, { headers: { Authorization: `Bearer ${token}` } });
      showNotification("Tenant deleted successfully", "success");
      fetchTenants();
    } catch (err) {
      showNotification("Failed to delete tenant", "error");
    }
    setShowDeleteConfirm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  return (
    <div className="tenant-dashboard">
      <TenantHeader onAdd={openAddForm} onLogout={handleLogout} />
      <TenantFilterBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        productFilter={productFilter} setProductFilter={setProductFilter}
        featureGroups={FEATURE_GROUPS}
      />
      <TenantStats stats={stats} />
      <TenantList tenants={filteredTenants} onEdit={openEditForm} onDelete={handleDelete} onManageProducts={openProductModal} />
      <TenantFormModal show={showForm} formData={formData} onChange={handleFormChange} onClose={() => setShowForm(false)} onSave={handleSave} editMode={editMode} />
      <ManageProductsModal show={productModalOpen} tenant={selectedTenant} featureGroups={FEATURE_GROUPS} selectedFeatures={selectedFeatures} toggleFeature={toggleFeature} onClose={() => setProductModalOpen(false)} onSave={saveFeatures} />
      <DeleteConfirmModal show={showDeleteConfirm} onCancel={() => setShowDeleteConfirm(false)} onConfirm={confirmDelete} />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
    </div>
  );
}

export default TenantDashboard;