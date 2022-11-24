const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
require("./middleware/logger")();
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const dbConnection = require("./config/database");
const corsOption = {
  origin: true,
  credentials: true,
  exposedHeaders: ["authorization"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(
  fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

app.use("/api/", require("./routes"));

const server = http.createServer(app);

app.use("/public", express.static(path.join(__dirname, "./public")));
// app.use("*", express.static(path.join(__dirname, "./client/build/index.html")));

const setPort = process.env.PORT || 8080;

dbConnection().then(() => {
  server.listen(setPort, () => console.log(`Move running on PORT # ${setPort}`));
});
