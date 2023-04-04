const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario existente"
            })
        }

        usuario = new Usuario(req.body); //Por defecto recibira los parametros que se requieran, ej: nombre, email etc

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //generate token

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Usuario existente o incorrecto, por favor comuniquese con el administrador"
        })

    }

};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;


    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Clave o usuario incorrectas"
            })
        }

        //confirm pass

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //generate token
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador"
        })
    }
};

const revalidarToken = async(req, res) => {


    const uid = req.uid;
    const name = req.name;

    //generate new token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}