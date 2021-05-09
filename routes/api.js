const connection = require("../database/connection.js");
const { checkKey } = require("../functions.js");
const Permissions = require("../constants/permissions.js");
const router = require("express").Router();
const fetch = require("node-fetch");
const http = require("http");
const { execFile } = require("child_process");

const express = require("express");
const app = express();

router.post("/container/:id/:option", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const valid = await checkKey(authorization, Permissions.START_CONTAINERS | Permissions.STOP_CONTAINERS);
    if (!valid) return res.status(401).json({ error: "Invalid token provided" });

    // curl --unix-socket /var/run/docker.sock -X POST http://localhost/v1.41/containers/0c79f2c7c52d4efc10877469172c3288b5278850720e97193d8bc9a376774715/stop
    // const agent = new http.Agent();
    // agent.createConnection({ path: "/var/run/docker.sock" });
    // await fetch(`http://host.docker.internal/v1.41/containers/${req.params.id}/${req.params.option}`, {
    //   agent,
    //   method: "POST",
    // }).then(console.log, console.error);

    const child = await execFile(
      "/usr/bin/curl",
      ["--unix-socket /var/run/docker.sock", "-X GET", "http://localhost/v1.41/containers/json"],
      { shell: "/bin/bash" },
      function (error, stdout, stderr) {
        if (error) {
          throw error;
        }
        console.log(stdout);
      }
    );

    // 2021-05-08T20:07:52.757182957Z

    return res.status(200).send({ ok: "olkkkkk" });
  } catch (error) {
    console.error("Some error in container start/stop", error);

    return res.status(500).json({ error: "Please contact the server administrator" });
  }
});

router.get("/some/test/thing", async (_req, res) => {
  await connection.query("SELECT * from user", function (error, results, fields) {
    if (error) throw error;
    console.log("wth am i doing ", results);
  });

  // itohatweb

  res.status(200).send("OK");
});

module.exports = router;
