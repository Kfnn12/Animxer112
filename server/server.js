const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const {Configuration, OpenAIApi}  = require("openai");

const userRoutes = require("./routes/userRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
connectDB();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/discussion", discussionRoutes);
app.use("/api/v1/admin", adminRoutes);


app.all("*", (req, res) => {
    res.status(500).json({error: "Invalid request"});
})

app.listen(PORT ,()=>{
    console.log("Server created");
});