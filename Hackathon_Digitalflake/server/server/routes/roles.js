const express = require("express");
const db = require("../db");
const utils = require("../utils.js"); // import your utility functions
const router = express.Router();

router.get("/roles", async (req, res) => {
  try {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching roles:", err);
        res.status(500).json(utils.createResult("Internal Server Error"));
      } else {
        console.log("Roles fetched successfully");
        const roles = result; // Assuming result contains the roles data
        res.status(200).json(utils.createResult(null, { roles })); // Include roles data directly under "data" key
      }
    });
  } catch (error) {
    console.error("Error in fetching roles:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

router.post("/addRoles", async (req, res) => {
  try {
    const { role_name } = req.body;

    const sql = `INSERT INTO roles (role_name) VALUES (?)`;

    db.query(sql, [role_name], (err, result) => {
      if (err) {
        console.error("Error adding role:", err);
        res.status(500).json(utils.createResult("Internal Server Error"));
      } else {
        console.log("Role added successfully");
        res
          .status(200)
          .json(utils.createResult(null, "Role added successfully"));
      }
    });
  } catch (error) {
    console.error("Error in adding role:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

router.delete("/deleteRole/:role_id", async (req, res) => {
  try {
    const { role_id } = req.params;

    if (!role_id) {
      return res.status(400).json(utils.createResult("Invalid input"));
    }

    const sql = `DELETE FROM roles WHERE role_id = ?`;

    db.query(sql, [role_id], (err, result) => {
      if (err) {
        console.error("Error deleting role:", err);
        return res
          .status(500)
          .json(utils.createResult("Internal Server Error"));
      }

      if (result.affectedRows === 0) {
        return res.status(404).json(utils.createResult("Role not found"));
      }

      console.log("Role deleted successfully");
      res
        .status(200)
        .json(utils.createResult(null, "Role deleted successfully"));
    });
  } catch (error) {
    console.error("Error in deleting role:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

router.put("/updateRole", async (req, res) => {
  try {
    const { role_id, role_name, status } = req.body;

    if (!role_id || !role_name || !status) {
      return res.status(400).json(utils.createResult("Invalid input"));
    }

    const sql = `UPDATE roles SET role_name = ?, status = ? WHERE role_id = ?`;

    db.query(sql, [role_name, status, role_id], (err, result) => {
      if (err) {
        console.error("Error updating role:", err);
        return res
          .status(500)
          .json(utils.createResult("Internal Server Error"));
      }

      if (result.affectedRows === 0) {
        return res.status(404).json(utils.createResult("Role not found"));
      }

      console.log("Role updated successfully");
      res
        .status(200)
        .json(utils.createResult(null, "Role updated successfully"));
    });
  } catch (error) {
    console.error("Error in updating role:", error);
    res.status(500).json(utils.createResult("Internal Server Error"));
  }
});

module.exports = router;
