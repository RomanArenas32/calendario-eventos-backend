/*
Users routes
api/auth

*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');


//LOGGIN
router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Ingrese una contraseña valida con mas de 6 caracteres').isLength({min: 6}),
    validarCampos
],
loginUsuario);

//REGISTER
router.post('/new',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Ingrese una contraseña valida con mas de 6 caracteres').isLength({min: 6}),
    validarCampos

],
crearUsuario);

//RENEW
router.get('/renew', validarJwt ,revalidarToken);



module.exports = router;