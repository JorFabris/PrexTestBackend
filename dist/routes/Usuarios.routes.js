"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuarios_model_1 = require("../models/Usuarios.model");
const userRoutes = express_1.Router();
userRoutes.post('/create', (req, res) => {
    const user = req.body;
    Usuarios_model_1.Usuario.findOne({ email: user.email })
        .then(userFind => {
        if (userFind) {
            return res.json({
                ok: false,
                msg: "This email already exist"
            });
        }
        Usuarios_model_1.Usuario.create(user)
            .then(userDB => {
            res.json(userDB);
        }).catch(err => {
            res.json({
                ok: false,
                msg: 'Something is wrong'
            });
        });
    });
});
//Ruta para hacer login en la app
userRoutes.post('/login', (req, res) => {
    const user = req.body;
    Usuarios_model_1.Usuario.findOne({ email: user.email, password: user.password }, '-password')
        .then(userFind => {
        if (!userFind) {
            return res.json({
                ok: false,
                msg: "The email or password are wrong"
            });
        }
        res.json({
            ok: true,
            usuario: userFind
        });
    }).catch(err => {
        res.json({
            ok: false,
            msg: "Upss! Something is wrong!"
        });
    });
});
exports.default = userRoutes;
