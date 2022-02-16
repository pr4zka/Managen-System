const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { database } = require("./key");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const pool = require("../../Crud-MySql/src/database");

require("dotenv").config();

//set port
const app = express();
const port = process.env.PORT || 4000;

//parsing middlewares
//parse applications
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "pr4zka",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);

//parse applications
app.use(bodyParser.json());

//template engine //hanbdlebars new configuration
//Configuracion de handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.create({
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");


//connected to database
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log("Connected as ID" + connection.threadId);
});

//routes
app.use(require("./routes/routes"));

app.use(express.static(path.join(__dirname, "public")));
//starting the server
app.listen(port, () => console.log(`Server on port ${port}`));
