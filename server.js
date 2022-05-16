const http = require("http");
const app = require("./app");
// import dotenv then use it to get the port from the .env file
require("dotenv").config();

app.set("port", 3000 || process.env.BACK_PORT);
const server = http.createServer(app);

server.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
