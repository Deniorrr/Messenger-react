const app = require("./server.js");
const DbAccess = require("./dbAccess.js");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./env/local.env" });

//sockets
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const token = socket.handshake.query.token;
  //authenticate token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return;
    //get all friendships
    DbAccess.getFriendsIds(user.id).then((result) => {
      socket.join(result);
    });
    socket.on("send-message", (conversationId, message) => {
      DbAccess.sendMessage(conversationId, user.id, message)
        .then(() => {
          socket.broadcast
            .to(conversationId)
            .emit("receive-message", message, user.id, conversationId);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  // console.log("a user connected with token" + token);
  // socket.on("join-room", (roomId) => {
  //   socket.join(roomId);
  // });
  // socket.on("send-message", (roomId, message) => {
  //   socket.to(roomId).emit("receive-message", message);
  // });
});

const startServer = () => {
  server.listen(3001);
  console.log("app Started on localhost:3001");
};

app.post("/register", async (req, res) => {
  //try {
  const { firstName, lastName, email, password } = req.body;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // const email = req.body.email;
  // const password = req.body.password;
  DbAccess.registerUser(firstName, lastName, email, password)
    .then((result) => {
      const user = { email: email, id: result };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.send(accessToken);
    })
    .catch((err) => {
      if (err === "EmailIsUsed") {
        //console.log("Email is used");
        return res.status(409).send("Email is already taken");
      }
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
      return res.send(accessToken);
    })
    .catch((err) => {
      console.log("ERROR", err);
      return res.status(409).send(err);
    });
});

app.get("/conversations", autenticateToken, async (req, res) => {
  DbAccess.getConversations(req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/search-users", autenticateToken, async (req, res) => {
  const searchInput = req.query.searchInput;
  DbAccess.searchUsers(req.user.id, searchInput)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/friends", autenticateToken, async (req, res) => {
  DbAccess.getFriends(req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/add-friend", autenticateToken, async (req, res) => {
  const userId = req.body.userId;
  DbAccess.addFriendRequest(req.user.id, userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/friend-requests", autenticateToken, async (req, res) => {
  DbAccess.getFriendsRequests(req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/accept-request", autenticateToken, async (req, res) => {
  const requestId = req.body.requestId;
  DbAccess.acceptRequest(requestId, req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/reject-request", autenticateToken, async (req, res) => {
  const requestId = req.body.requestId;
  DbAccess.rejectRequest(requestId, req.user.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/messages", autenticateToken, async (req, res) => {
  const conversationId = req.body.conversationId;
  DbAccess.getMessages(conversationId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/send-message", autenticateToken, async (req, res) => {
  const conversationId = req.body.conversationId;
  const message = req.body.message;
  DbAccess.sendMessage(conversationId, req.user.id, message)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/friends/:friendshipId", autenticateToken, async (req, res) => {
  const friendshipId = req.params.friendshipId;
  DbAccess.deleteFriendship(friendshipId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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
