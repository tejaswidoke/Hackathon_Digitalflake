const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const routesUser = require("./routes/user");
const routesRoles = require("./routes/roles");

const cors = require("cors");
app.use(cors("*"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", routesUser);
app.use("/roles", routesRoles);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
