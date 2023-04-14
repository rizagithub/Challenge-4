// import atau panggil package yang kita mau pake di aplikasi kita
const express = require("express");
// untuk baca public directory
const path = require("path");
const cookieParser = require("cookie-parser")
// mencatat setiap request ke server
const logger = require("morgan");
const cors = require("cors");
// module express untuk upload
const FileUpload = require("express-fileupload");

const indexRouter = require("./routes/index");
const carsRouter = require("./routes/cars");

// framework utk http server
const app = express();

// middleware
app.use(cors());
app.use(FileUpload());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');

//setting view engine
app.use(express.static(path.join(__dirname, "views")));
app.use("/", indexRouter);

//public
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", carsRouter);

var port = process.env.PORT || '8000';
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

module.exports = app;