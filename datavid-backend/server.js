// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  country: String,
  city: String,
});

const Member = mongoose.model("Member", memberSchema, "members");
// Helper function to calculate age
const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

// Routes
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/members", async (req, res) => {
  const { firstName, lastName, dob, country, city } = req.body;

  // Check age
  const age = calculateAge(dob);
  if (age < 18) {
    return res
      .status(400)
      .json({ message: "Member must be at least 18 years old." });
  }

  // Check for duplicates
  const existingMember = await Member.findOne({
    firstName,
    lastName,
    country,
    city,
  });
  if (existingMember) {
    return res.status(400).json({
      message: "A member with the same name and location already exists.",
    });
  }

  const member = new Member({ firstName, lastName, dob, country, city });
  try {
    await member.save();
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/members/:id", async (req, res) => {
  const { firstName, lastName, dob, country, city } = req.body;
  const memberData = { firstName, lastName, dob, country, city };

  // Check age
  const age = calculateAge(dob);
  if (age < 18) {
    return res
      .status(400)
      .json({ message: "Member must be at least 18 years old." });
  }

  // Check for duplicates
  const existingMember = await Member.findOne({
    firstName,
    lastName,
    country,
    city,
    _id: { $ne: req.params.id },
  });
  if (existingMember) {
    return res
      .status(400)
      .json({
        message: "A member with the same name and location already exists.",
      });
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      memberData,
      { new: true }
    );
    if (!updatedMember)
      return res.status(404).json({ message: "Member not found" });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/members/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
