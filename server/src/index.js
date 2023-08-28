const server = require("./server.js");
const DbAccess = require("./dbAccess.js");
const startServer = () => {
  server.listen(3001);
  console.log("app Started on localhost:3001");
};

startServer();

console.log(DbAccess.x);
