const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");

// Call an instance of express
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// secure apps by setting various HTTP headers
app.use(helmet.permittedCrossDomainPolicies());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://192.168.1.3:8080",
    "http://localhost:8080",
    "http://10.93.169.224:8080/",
  ];
  const origin = req.headers.origin;
  console.log(origin);
  if (allowedOrigins.includes(origin))
    res.setHeader("Access-Control-Allow-Origin", origin);
  // res.setHeader("Access-Control-Allow-Origin", "*"); // to change with ip of our website
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
// database
const db = require("./models/index");
db.sequelize.sync({ logging: false, force: false });
try {
  db.sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// routes
require("./routes/user.routes")(app);
require("./routes/post.routes")(app);

module.exports = app;
