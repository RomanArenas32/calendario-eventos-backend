/*
    this route is /api/events
*/

const { getEvento, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { Router } = require('express');
const router = Router();
const validarJwt = require('../middlewares/validar-jwt');



//events

//get
router.get('/', validarJwt, getEvento);

//create
router.post('/', validarJwt, crearEvento);

//update
router.put('/:id', validarJwt, actualizarEvento);

//delete
router.delete('/:id', validarJwt, borrarEvento);


module.exports = router;