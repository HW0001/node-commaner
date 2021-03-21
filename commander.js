const db = require("./db.js");
module.exports = {
  add(value, cb) {
    db.read().then((data) => {
      let arr;
      try {
        arr = JSON.parse(data.toString());
      } catch {
        arr = [];
      }
      arr.push({
        id: new Date().valueOf(),
        name: value,
        done: false,
      });
      db.write(JSON.stringify(arr)).then(() => cb());
    });
  },
};
