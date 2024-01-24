//configuring dotenv to use environment variables from .env file
require('dotenv').config();

// import modules
const path = require("path");

// connecting the database 
const {mongooConnect} = require("./config/mongooDB");
mongooConnect();

// creating express server
const express = require("express");
const app = express();

// specifying the port
const port = process.env.PORT || 5000;

// CORS Handler
const corsHandler = require("./middlewares/corsHandler");
app.use(corsHandler);

// using express.json
app.use(express.json());

// healthcheck
const statusRoutes = require("./routes/statusRoutes");
app.use("", statusRoutes); 

// routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/api", indexRoutes);

// Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

//Listening om the port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});