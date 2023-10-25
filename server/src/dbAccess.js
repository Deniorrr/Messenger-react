const mysql = require("mysql");
const bcrypt = require("bcrypt");

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
      this.db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          return reject("EmailIsUsed");
        }
        const hashedPassword = bcrypt.hash(password, 10);
        const sql2 = `INSERT INTO users (firstName, lastName, email, password) VALUES ("${firstName}", "${lastName}", "${email}", "${hashedPassword}")`;
        return new Promise((resolve, reject) => {
          this.db.query(sql2, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      });
    });
  }
  //przy login można skorzystać Promise.all, żeby jednocześnie sprawdzić czy email istnieje i czy hasło jest poprawne
  static async loginUser(email, password) {
    const sql = `SELECT * FROM users WHERE email = "${email}"`;
    return new Promise((resolve, reject) => {
      //console.log(email, password);
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

  static async getConversations(userId) {
    return [
      {
        user: { id: 1, firstName: "Denis", lastName: "Poczęty" },
        lastMessage: { message: "siema", when: "12:30" },
        conversationId: 1,
      },
      {
        user: { id: 2, firstName: "nie", lastName: "nie" },
        lastMessage: { message: "nie", when: "12:30" },
        conversationId: 2,
      },
      {
        user: { id: 3, firstName: "wtf", lastName: "wtf" },
        lastMessage: { message: "siema", when: "12:30" },
        conversationId: 3,
      },
    ];
    // const sql = `SELECT * FROM conversations WHERE user1 = ${userId} OR user2 = ${userId}`;
    // return new Promise((resolve, reject) => {
    //   this.db.query(sql, (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       return reject(err);
    //     }
    //     resolve(result);
    //   });
    // });
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
}
module.exports = DbAccess;
