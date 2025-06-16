const express = require("express");
const cors = require("cors");
require("dotenv").config();
const DBconnect = require("./db");
const userRoutes= require('./routes/userRoutes')
const tenantRoutes= require('./routes/tenantRoutes')

const app = express();
app.use(cors());
app.use(express.json());
DBconnect();

//user
app.use('/api',userRoutes);
app.use('/api',tenantRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));