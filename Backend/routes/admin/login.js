var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* llama a la pagina */
router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

/* Logout */
router.get('/logout', function (req, res, next) {
    req.session.destroy(); //destruyo las variables de sesión
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});


/*Login*/
router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id; //Esto se maneja con la bd
            req.session.nombre = data.usuario; // Esto tambien.
            res.redirect('admin/entrenamientos');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;