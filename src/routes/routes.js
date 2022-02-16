const { Router } = require("express");
const userController = require('../server/userController');
const router = Router();

//create, find, update, delete


//get the view of userController and render
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/add_user", userController.form); //el metodo get es para rendizar el formulario
router.post("/add_user", userController.create);//y el metodo post usaremos para cargar los datos a la bd 
router.get('/edit_user/:id', userController.edit);//usamos el metodo get para renderizar los usuarios a ser editados
router.post('/edit_user/:id', userController.update);//este metodos usaremos para editar los usuarios nuevos
router.get('/delete/:id', userController.delete);//method for delete user
router.get('/view_user/:id', userController.viewuser);
module.exports = router;
 