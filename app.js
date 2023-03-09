const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routing functions...
app.use(require("./routes/auth.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/video.routes"));
app.use(require("./routes/upload.routes"));

app.get("/", (req, res) => {
  console.log("Express server is running");
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
