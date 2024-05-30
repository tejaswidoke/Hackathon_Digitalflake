const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Gaurav@98",
  database: "user_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Handling connection errors
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
  // Release the connection back to the pool when done
  conn.release();
});

module.exports = connection;
