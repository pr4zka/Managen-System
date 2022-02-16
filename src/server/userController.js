const { rawListeners } = require("../database");
const pool = require("../database");

//seleciona todos los usuariuos y renderiza en el formulario
exports.view = async (req, res) => {
  //en la variable user guarda los datos pedidos traidos de la base de datos
  const users = await pool.query("SELECT * FROM user"); //toma el id inico del usuario y le devuelve los enlaces
  res.render("index", { user: users });
};

//find uer by search
exports.find = async (req, res) => {
  let searchTerm = req.body.search;
  //meto para encontrar la palabre escrita en el buscador
  await pool.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("index", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};
exports.form = async (req, res) => {
  res.render("add-user");
};

//add new users
exports.create = async (req, res) => {
  // <- La función middleware ya no es async
  const { first_name, last_name, email, phone, comments } = req.body; //recuperamos los datos a travez del req.body
  const user = {
    first_name,
    last_name,
    email,
    phone,
    comments,
    //ALMACENA ESOS DATOS EN LA VARIABLE USER
  };
  pool.query("INSERT INTO user set ?", [user], (error, results, fields) => {
    // <- usamos una función callback
    if (error) {
      // <- Si ocurre un error en la consulta
      console.log(error); // <- mostramos error por consol
      return res.status(500).send("error"); // <- enviamos mensaje al cliente
    }
    // ...
    // hacemos algo con los resultados (si lo necesitamos)
    // ...
    res.redirect("/"); // redirecionamos a la pagina con los links
  });
};

//edit users
exports.edit = async (req, res) => {
  //en la variable user guarda los datos pedidos traidos de la base de datos
  const users = await pool.query("SELECT * FROM user WHERE id = ?", [
    req.params.id,
  ]); //toma el id inico del usuario y le devuelve los enlaces
  res.render("edit-user", { user: users });
};

//update user
exports.update = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, comments } = req.body;
  const newUser = {
    first_name,
    last_name,
    email,
    phone,
    comments,
  };
  await pool.query("UPDATE user set ? WHERE id=?", [newUser, id]);
  res.redirect("/");
};

//delete user
exports.delete = async (req, res) => {
  const { id } = req.params; //destructurar el params para sacar el id
  await pool.query("DELETE FROM user WHERE ID=?", [id]);
  res.redirect("/");
};

//view all users
exports.viewuser = async (req, res) => {
  const { id } = req.params;
  //en la variable user guarda los datos pedidos traidos de la base de datos
  const users = await pool.query("SELECT * FROM user WHERE id = ?", [id]); //toma el id inico del usuario y le devuelve los enlaces
  res.render("view-user", { user: users });
};
