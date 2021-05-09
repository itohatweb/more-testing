require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.set("port", port);

require("./router")(app);

app.listen(port, () => console.info(`Listening on port ${port}`));
