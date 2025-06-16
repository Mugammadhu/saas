const express = require("express");
const Tenant = require("../models/Tenant");
const router = express.Router();

// Get all tenants
router.get("/tenants", async (req, res) => {
  try {
    const tenants = await Tenant.find({});
    const formatted = tenants.map((tenant) => ({
      _id: tenant._id,
      name: tenant.name,
      domain: tenant.domain,
      email: tenant.email,
      status: tenant.status,
      plan: tenant.plan,
      createdAt: tenant.createdAt,
      products: tenant.features || [],
      features: tenant.features || [],
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
});

// Get tenant by ID
router.get("/tenants/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenant" });
  }
});

// Add a new tenant
router.post("/tenants", async (req, res) => {
  const { name, domain, email, status, plan } = req.body;
  const features = req.body.features || [];
  const createdAt = req.body.createdAt || Date.now();

  try {
    const newTenant = await Tenant.create({
      name,
      domain,
      email,
      status,
      plan,
      features,
      createdAt,
    });
    res.status(201).json(newTenant);
  } catch (err) {
    console.error("POST /tenants error:", err);
    res.status(400).json({ error: "Error creating tenant" });
  }
});

// Update tenant
router.put("/tenants/:id", async (req, res) => {
  try {
    const updated = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update tenant" });
  }
});

// Delete tenant
router.delete("/tenants/:id", async (req, res) => {
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Error deleting tenant" });
  }
});

module.exports = router;
