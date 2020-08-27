"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Peliculas_model_1 = require("../models/Peliculas.model");
const fileSytem_1 = __importDefault(require("../classes/fileSytem"));
const peliculasRoutes = express_1.Router();
const fileSystem = new fileSytem_1.default();
peliculasRoutes.get('/getAll', (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    Peliculas_model_1.Peliculas.find({})
        .limit(10)
        .skip(skip)
        .sort({ _id: -1 })
        .exec()
        .then(peliculasDB => {
        if (peliculasDB.length != 0) {
            return res.json(peliculasDB);
        }
        res.json(peliculasDB);
    });
});
peliculasRoutes.get('/search/:txt', (req, res) => {
    let searchTxt = String(req.params.txt);
    Peliculas_model_1.Peliculas.find({ titulo: { $regex: searchTxt, $options: 'i' } })
        .sort({ _id: -1 })
        .exec()
        .then(peliculasDB => {
        if (peliculasDB.length != 0) {
            return res.json(peliculasDB);
        }
        res.json(peliculasDB);
    });
});
peliculasRoutes.get('/getOne/:id', (req, res) => {
    let id = String(req.params.id);
    Peliculas_model_1.Peliculas.findOne({ _id: id })
        .then(filmDB => {
        if (!filmDB) {
            return res.json({
                ok: false,
                msg: "That movie doesn't exist!"
            });
        }
        res.json(filmDB);
    }).catch(err => {
        res.json({
            ok: false,
            mgs: "Upss! Something went wrong"
        });
    });
});
peliculasRoutes.delete('/deleteOne/:id', (req, res) => {
    let id = String(req.params.id);
    Peliculas_model_1.Peliculas.findByIdAndRemove({ _id: id })
        .then(filmDB => {
        if (!filmDB) {
            return res.json({
                ok: false,
                msg: "That movie doesn't exist!"
            });
        }
        res.json({
            ok: true,
            msg: "Film delete succesfully"
        });
    }).catch(err => {
        res.json({
            ok: false,
            mgs: "Upss! Something went wrong"
        });
    });
});
peliculasRoutes.post('/create', (req, res) => {
    const film = req.body;
    Peliculas_model_1.Peliculas.collection.dropIndexes().then(resp => {
        Peliculas_model_1.Peliculas.create(film)
            .then(filmDB => {
            res.json(filmDB);
        }).catch(err => {
            console.log(err);
            res.json({
                ok: false,
                msg: "Upss! Ocurrió un error!"
            });
        });
    });
});
peliculasRoutes.put('/update', (req, res) => {
    const film = req.body;
    Peliculas_model_1.Peliculas.findByIdAndUpdate({ _id: film._id }, film)
        .then(filmDB => {
        res.json(filmDB);
    }).catch(err => {
        console.log(err);
        res.json({
            ok: false,
            msg: "Upss! Ocurrió un error!"
        });
    });
});
//Ruta para subir fotos
peliculasRoutes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.files.image;
    const filmId = req.headers.filmid;
    console.log(filmId);
    if (!file) {
        return res.status(400).json({
            ok: false,
            msg: "No se subió ningun archivo"
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo que está tratando de subir no es una imagen'
        });
    }
    let nombreArchivo = yield fileSystem.guardarImagen(file, filmId);
    if (nombreArchivo) {
        Peliculas_model_1.Peliculas.updateOne({ _id: filmId }, { img: nombreArchivo })
            .then(resp => {
            res.json({
                ok: true,
                msg: 'La imagen se subió correctamente'
            });
        });
    }
    else {
        res.json({
            ok: false,
            msg: 'Upsss! algo salió mal.'
        });
    }
}));
peliculasRoutes.get('/image/:filmId/:img', (req, res) => {
    const filmId = req.params.filmId;
    const img = req.params.img;
    const pathImg = fileSystem.getFotoUrl(filmId, img);
    res.sendFile(pathImg);
});
exports.default = peliculasRoutes;
