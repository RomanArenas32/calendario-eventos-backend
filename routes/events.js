/*
    this route is /api/events
*/

const { getEvento, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();
const validarJwt = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const isDate = require("../helpers/isDate");

router.use(validarJwt); //shared midleware in all routes


//events

//get
router.get('/', getEvento);

//create
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha es obligatoria').custom(isDate),

        validarCampos

    ]
    , crearEvento);

//update
router.put('/:id',
    [check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha es obligatoria').custom(isDate), 
    
    validarCampos

]
    , actualizarEvento);

//delete
router.delete('/:id', borrarEvento);


module.exports = router;