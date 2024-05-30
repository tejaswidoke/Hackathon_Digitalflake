const express = require("express");
const db = require("../db");
const utils = require("../utils");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();

// Signup
const multer = require("multer");
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file with unique name
  },
});

const upload = multer({ storage: storage });

// Assuming you have already configured your route with express.Router()
router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    // Get the file path of the uploaded photo
    const photoPath = req.file.path;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (name, email, mobile, status, password, role_id, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [name, email, mobile, "active", hashedPassword, role, photoPath], // 'active' for status
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json(utils.createResult("Internal Server Error"));
        } else {
          console.log("Data inserted successfully");
          res
            .status(200)
            .json(utils.createResult(null, "Data inserted successfully"));
        }
      }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

// Login
// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query to find user with provided email and select specific columns
    const sql =
      "SELECT name, user_id, role_id, password FROM users WHERE email = ?";

    // Execute the query
    db.query(sql, [email], async (err, result) => {
      if (err) {
        // Handle database query error
        console.error("Error querying database:", err);
        return res
          .status(500)
          .json(utils.createResult("Internal Server Error"));
      }

      if (result.length === 0) {
        // No user found with the provided email
        return res.status(404).json(utils.createResult("User not found"));
      }

      const user = result[0];

      // Compare the provided password with the hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Passwords match, login successful
        const { name, user_id, role_id } = user;
        res
          .status(200)
          .json(utils.createResult(null, { name, user_id, role_id }));
      } else {
        // Passwords don't match, invalid credentials
        res.status(401).json(utils.createResult("Invalid credentials"));
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in login route:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

// GET endpoint to fetch all users
router.get("/users", async (req, res) => {
  try {
    const sql = `
      SELECT 
        u.user_id, 
        u.name, 
        u.email, 
        r.role_name, 
        u.mobile, 
        u.status,
        u.photo
      FROM 
        users u
      JOIN 
        roles r ON u.role_id = r.role_id;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).json(utils.createResult("Internal Server Error"));
      } else {
        console.log("Users fetched successfully");
        res.status(200).json(utils.createResult(null, result));
      }
    });
  } catch (error) {
    console.error("Error in fetching users:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

router.put("/users/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { name, email, mobile, status, role_id } = req.body;

    const sql = `UPDATE users SET name = ?, email = ?, mobile = ?, status = ?, role_id = ? WHERE user_id = ?`;

    db.query(
      sql,
      [name, email, mobile, status, role_id, userId],
      (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          res.status(500).json(utils.createResult("Internal Server Error"));
        } else {
          if (result.affectedRows > 0) {
            console.log("User updated successfully");
            res
              .status(200)
              .json(utils.createResult(null, "User updated successfully"));
          } else {
            console.log("User not found");
            res.status(404).json(utils.createResult("User not found"));
          }
        }
      }
    );
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

router.delete("/users/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    const sql = `DELETE FROM users WHERE user_id = ?`;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        res.status(500).json(utils.createResult("Internal Server Error"));
      } else {
        if (result.affectedRows > 0) {
          console.log("User deleted successfully");
          res
            .status(200)
            .json(utils.createResult(null, "User deleted successfully"));
        } else {
          console.log("User not found");
          res.status(404).json(utils.createResult("User not found"));
        }
      }
    });
  } catch (error) {
    console.error("Error in deleting user:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

module.exports = router;
