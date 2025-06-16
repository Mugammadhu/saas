const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }
});

module.exports = mongoose.model('Product', productSchema);
