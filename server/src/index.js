const app = require("./server.js");
const DbAccess = require("./dbAccess.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./env/local.env" });

const startServer = () => {
  app.listen(3001);
  console.log("app Started on localhost:3001");
};

app.post("/register", async (req, res) => {
  //try {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  DbAccess.registerUser(firstName, lastName, email, password)
    .then((result) => {
      console.log("RESULT", result);
      res.send("ok");
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.send(err);
    });
  // } catch {
  //   console.log()
  //   res.status(500).send("error has occured");
  // }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  DbAccess.loginUser(email, password)
    .then((result) => {
      const user = { email: email, id: result[0].id };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.send(accessToken);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).send(err);
    });
});

app.get("/conversations", autenticateToken, async (req, res) => {
  console.log(req.user);
  DbAccess.getConversations(req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).send(err);
    });
});

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // if authHeader is undefined, token will be undefined too
  if (token == null) return res.sendStatus(401); // 401 - unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // 403 - forbidden
    req.user = user;
    next();
  });
}

startServer();
