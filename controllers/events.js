
const {response} = require('express');

const getEvento = (req, res = response)=>{
    return res.status(200).json({
        ok: true,
        msg: 'Obteniendo evento'
    })
}
const crearEvento = (req, res = response)=>{
    return res.status(200).json({
        ok: true,
        msg: 'Creando evento'
    })
}

const actualizarEvento = (req, res = response)=>{
    return res.status(200).json({
        ok: true,
        msg: 'Actualizando evento'
    })
}

const borrarEvento = (req, res = response)=>{
    return res.status(200).json({
        ok: true,
        msg: 'Borrando evento'
    })
}

module.exports = {
    getEvento,
    borrarEvento,
    actualizarEvento,
    crearEvento
}