const fs = require("fs");
const path = require("path");
const USER_HOME = process.env.HOME || process.env.USERPROFILE;
const dbpath = path.join(USER_HOME, ".todo.json");

module.exports = {
  read(path = dbpath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  },
  write(value) {
    return new Promise((resolve, reject) => {
      fs.writeFile(dbpath, value, (err) => {
        if (err) return reject(err);
        return resolve("success");
      });
    });
  },
};
