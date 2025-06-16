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

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
