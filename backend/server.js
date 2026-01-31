const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/taskmanager")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API is Running");
});

// Server Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
