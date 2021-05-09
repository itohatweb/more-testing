const connection = require("./database/connection.js");

module.exports = {
  checkKey: function (key, perms) {
    return new Promise((res, rej) => {
      connection.query(`SELECT * FROM user WHERE token="${key}"`, function (err, result) {
        if (err) {
          console.error("Error in DB", err);
          return rej(err);
        }

        if (result && result.length) {
          if (perms) {
            if (!result[0].perms) return res(false);

            if ((perms & result[0].perms) !== perms) return res(false);
          }

          return res(true);
        }

        return res(false);
      });
    });
  },
};
