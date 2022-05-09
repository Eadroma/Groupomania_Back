const http = require("http");
const app = require("./app");
// import dotenv then use it to get the port from the .env file
require("dotenv").config();

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
