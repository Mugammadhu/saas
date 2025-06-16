const mongoose = require('mongoose');
const Tenant = require('./models/Tenant');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Tenant.deleteMany();
  await Product.deleteMany();

  const tenants = await Tenant.insertMany([
    {
      name: 'Acme Corporation',
      email: 'acme@example.com',
      status: 'active',
      plan: 'Enterprise',
      features: ['Feature A', 'Feature B']
    },
    {
      name: 'Globex Industries',
      email: 'globex@example.com',
      status: 'active',
      plan: 'Professional',
      features: ['Feature A']
    },
    {
      name: 'Initech LLC',
      email: 'initech@example.com',
      status: 'inactive',
      plan: 'Starter',
      features: ['Feature A']
    }
  ]);

  const allProducts = [];

  for (let tenant of tenants) {
    const products = await Product.insertMany([
      { name: 'Product A', description: 'Cloud Suite', tenantId: tenant._id },
      { name: 'Product B', description: 'Analytics', tenantId: tenant._id },
    ]);

    tenant.products = products.map(p => p._id);
    await tenant.save();
    allProducts.push(...products);
  }

  console.log('🌱 Seeding complete!');
  mongoose.disconnect();
});
