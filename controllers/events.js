
const { response } = require('express');
const Evento = require('../models/Evento');

const getEvento = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');


    return res.status(200).json({
        ok: true,
        eventos
    })
}
const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al concectar a la base de datos reintente nuevamente. Si el error persiste comuniquese con el administrador'
        })
    }

}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);


        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento que intenta acceder es inexistente'
            });
        }
        if (evento.user.toString() != uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento solo puede modificarse por el usuario que lo creo'
            });


        }
        //succes update
        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true }); //este ultimo argumento implica que solo se mostrara el evento actualizado y no los dos
        console.log(eventoActualizado);

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al conectar con la base de datos. Reintente nuevamente. Si el error persiste comuniquese con el administrados'
        });
    }

}

const borrarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;


    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento que intenta acceder es inexistente'
            });
        }
        if (evento.user.toString() != uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento solo puede eliminarse por el usuario que lo creo'
            });
        }
        await Evento.findByIdAndDelete(evento);
        return res.json({ ok: true })
    }


    catch (error) {
        console.log(error)
    }
    return res.status(500).json({
        ok: true,
        msg: 'Error en el servidor. Por favor hable con el administrador'
    })
}

module.exports = {
    getEvento,
    borrarEvento,
    actualizarEvento,
    crearEvento
}