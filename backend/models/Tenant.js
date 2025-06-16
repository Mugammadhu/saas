const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: String,
  domain: String,              // ✅ Must exist
  email: String,
  status: String,
  plan: String,
  features: [String],
  createdAt: Date,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Tenant', tenantSchema);
