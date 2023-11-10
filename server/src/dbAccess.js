const mysql = require("mysql");
const bcrypt = require("bcrypt");
const e = require("express");

class DbAccess {
  static db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "messenger",
  });
  static async registerUser(firstName, lastName, email, password) {
    const sql = `SELECT * FROM users WHERE email = "${email}"`;
    const result = await new Promise((resolve, reject) => {
      this.db.query(sql, async (err, result) => {
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
            const sql3 = `SELECT id FROM users WHERE email = "${email}"`;
            console.log(sql3);
            this.db.query(sql3, (err, result) => {
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
  //przy login można skorzystać Promise.all, żeby jednocześnie sprawdzić czy email istnieje i czy hasło jest poprawne
  static async loginUser(email, password) {
    const sql = `SELECT * FROM users WHERE email = "${email}"`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (result.length === 0) {
          console.log(result.length);
          return reject("email not found");
        }
        if (bcrypt.compare(password, result[0].password)) {
          return resolve(result);
        }
        reject("wrong password");
      });
    });
  }

  static getConversations(userId) {
    return new Promise((resolve, reject) => {
      let conversations = [];
      this.db.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.beginTransaction((err2) => {
          if (err2) return reject(err2);
          const sql = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user1 = ${userId} AND user2 = users.id`;
          const sql2 = `SELECT friendships.id, friendships.user1, friendships.user2, users.firstName, users.lastName, users.email FROM friendships, users WHERE status = "accepted" AND user2 = ${userId} AND user1 = users.id`;
          connection.query(sql, (err3, result) => {
            if (err3) {
              connection.rollback(() => {
                connection.release();
                return reject(err3);
              });
            }
            conversations = result;
          });
          connection.query(sql2, (err3, result) => {
            if (err3) {
              connection.rollback(() => {
                connection.release();
                return reject(err3);
              });
            }
            conversations = conversations.concat(result);
          });
          connection.commit((err3) => {
            if (err3) {
              console.log(err3);
              connection.rollback(() => {
                connection.release();
                throw err3;
              });
            }
            return resolve(conversations);
          });
          connection.release();
        });
      });
    });
  }
  static async searchUsers(searchInput) {
    const phrases = searchInput.split(" ");

    let sql = `SELECT * FROM users WHERE`;
    for (let i = 0; i < phrases.length; i++) {
      sql += ` UPPER(firstName) LIKE UPPER("%${phrases[i]}%") OR UPPER(lastName) LIKE UPPER("%${phrases[i]}%") OR UPPER(email) LIKE UPPER("%${phrases[i]}%")`;
      if (i !== phrases.length - 1) {
        sql += " OR";
      }
    }
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }
  static async addFriendRequest(userId, friendId) {
    const sql = `INSERT INTO friendships (user1, user2, status) VALUES (${userId}, ${friendId},"pending")`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async getFriendsRequests(userId) {
    const sql = `SELECT friendships.id, users.firstName, users.lastName, users.email FROM friendships, users WHERE user2 = ${userId} AND status = "pending" AND user1 = users.id`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async acceptRequest(requestId, userId) {
    const sql = `UPDATE friendships SET status = "accepted" WHERE id = ${requestId} AND user2 = ${userId}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async rejectRequest(requestId, userId) {
    const sql = `DELETE FROM friendships WHERE id = ${requestId} AND user2 = ${userId}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async getMessages(friendshipId) {
    const sql = `SELECT * FROM messages WHERE friendshipId = ${friendshipId}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async sendMessage(friendshipId, senderId, message) {
    const sql = `INSERT INTO messages (friendshipId, senderId, message, time) VALUES (${friendshipId}, ${senderId}, "${message}", NOW())`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
module.exports = DbAccess;
