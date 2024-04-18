const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const e = require("express");

class DbAccess {
  static db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "qwerty123",
    database: "messenger",
  });
  static async registerUser(firstName, lastName, email, password) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const result = await new Promise((resolve, reject) => {
      this.db.query(sql, [email], async (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          reject("EmailIsUsed");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql2 = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`; //przerobić tak wszystkie zapytania
        this.db.query(
          sql2,
          [firstName, lastName, email, hashedPassword],
          (err, result) => {
            if (err) {
              reject(err);
            }
            const sql3 = `SELECT id FROM users WHERE email = ?`;
            console.log(sql3);
            this.db.query(sql3, [email], (err, result) => {
              if (err) {
                reject(err);
              }
              console.log(result[0].id);
              resolve(result[0].id);
            });
          }
        );
      });
    });
    return result;
  }
  static async loginUser(email, password) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [email], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (result.length === 0) {
          console.log(result.length);
          return reject("email not found");
        }
        bcrypt.compare(password, result[0].password).then((res) => {
          if (!res) {
            return reject("wrong password");
          }
          console.log(result);
          return resolve(result);
        });
      });
    });
  }

  static getConversations(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT friend.firstName,
       friend.lastName,
       friendships.id AS "id",
       latest_message.senderId,
       TIME_FORMAT(latest_message.time, "%H:%i") AS "time",
       latest_message.message,
       sender.firstName AS "senderName"
        FROM users
        JOIN friendships ON users.id = friendships.user1
        JOIN users AS friend ON friendships.user2 = friend.id
        LEFT JOIN (
        SELECT messages.friendshipId, MAX(time) AS max_time
        FROM messages
        GROUP BY messages.friendshipId
        ) AS latest_message_time ON friendships.id = latest_message_time.friendshipId
        LEFT JOIN messages AS latest_message ON latest_message_time.friendshipId = latest_message.friendshipId AND latest_message_time.max_time = latest_message.time
        LEFT JOIN users AS sender ON latest_message.senderId = sender.id
        WHERE friendships.status = "accepted" AND
        users.id = ?;`;

      const sql2 = `
      SELECT friend.firstName,
       friend.lastName,
       friendships.id AS "id",
       latest_message.senderId,
       TIME_FORMAT(latest_message.time, "%H:%i") AS "time",
       latest_message.message,
       sender.firstName AS "senderName"
        FROM users
        JOIN friendships ON users.id = friendships.user2
        JOIN users AS friend ON friendships.user1 = friend.id
        LEFT JOIN (
        SELECT messages.friendshipId, MAX(time) AS max_time
        FROM messages
        GROUP BY messages.friendshipId
        ) AS latest_message_time ON friendships.id = latest_message_time.friendshipId
        LEFT JOIN messages AS latest_message ON latest_message_time.friendshipId = latest_message.friendshipId AND latest_message_time.max_time = latest_message.time
        LEFT JOIN users AS sender ON latest_message.senderId = sender.id
        WHERE friendships.status = "accepted" AND
        users.id = ?;`;
      this.db.query(sql, [userId], (err, result1) => {
        if (err) {
          return reject(err);
        }
        this.db.query(sql2, [userId], (err, result2) => {
          if (err) {
            return reject(err);
          }
          console.log(result1.concat(result2));
          resolve(result1.concat(result2));
        });
      });
    });

    //const sql = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user1 = ? AND user2 = users.id`;
    //const sql2 = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user2 = ? AND user1 = users.id`;
  }
  static async searchUsers(userId, searchInput) {
    const phrases = searchInput.split(" ");
    console.log(userId);
    let sql = `SELECT id, firstName, lastName, email
    FROM users
    WHERE id <> ?
    AND id NOT IN (
        SELECT user2
        FROM friendships
        WHERE user1 = ?
        UNION
        SELECT user1
        FROM friendships
        WHERE user2 = ?
    ) AND (`;
    let parameters = [userId, userId, userId];
    for (let i = 0; i < phrases.length; i++) {
      sql += ` UPPER(firstName) LIKE ? OR UPPER(lastName) LIKE ? OR UPPER(email) LIKE ?`;
      parameters.push(`%${phrases[i]}%`, `%${phrases[i]}%`, `%${phrases[i]}%`);
      if (i !== phrases.length - 1) {
        sql += " OR";
      } else {
        sql += ")";
      }
    }
    console.log(sql);
    return new Promise((resolve, reject) => {
      this.db.query(sql, parameters, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }
  static async addFriendRequest(userId, friendId) {
    const sql = `INSERT INTO friendships (user1, user2, status) VALUES (?, ?,"pending")`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [userId, friendId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async getFriendsRequests(userId) {
    const sql = `SELECT friendships.id, users.firstName, users.lastName, users.email FROM friendships, users WHERE user2 = ? AND status = "pending" AND user1 = users.id`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [userId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async acceptRequest(requestId, userId) {
    const sql = `UPDATE friendships SET status = "accepted" WHERE id = ? AND user2 = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [requestId, userId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async deleteFriendship(friendshipId) {
    const sql1 = `DELETE FROM messages WHERE friendshipId = ?`;
    const sql2 = `DELETE FROM friendships WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.query(sql1, [friendshipId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        this.db.query(sql2, [friendshipId], (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          resolve(result);
        });
      });
    });
  }

  static async rejectRequest(requestId, userId) {
    const sql = `DELETE FROM friendships WHERE id = ? AND user2 = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [requestId, userId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async getMessages(friendshipId) {
    const sql = `SELECT * FROM messages WHERE friendshipId = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [friendshipId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async sendMessage(friendshipId, senderId, message) {
    const sql = `INSERT INTO messages (friendshipId, senderId, message, time) VALUES (?, ?, ?, NOW())`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [friendshipId, senderId, message], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async getFriendsIds(userId) {
    const sql = "SELECT id FROM friendships WHERE user1 = ? OR user2 = ?";
    return new Promise((resolve, reject) => {
      this.db.query(sql, [userId, userId], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const friendshipsIds = result.map((x) => x.id);
        return resolve(friendshipsIds);
      });
    });
  }

  static async getFriends(userId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user1 = ? AND user2 = users.id`;
      const sql2 = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user2 = ? AND user1 = users.id`;

      this.db.query(sql, [userId], (err, result1) => {
        if (err) {
          return reject(err);
        }
        this.db.query(sql2, [userId], (err, result2) => {
          if (err) {
            return reject(err);
          }
          resolve(result1.concat(result2));
        });
      });
    });
  }
}
module.exports = DbAccess;
