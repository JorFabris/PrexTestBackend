"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peliculas = void 0;
const mongoose_1 = require("mongoose");
//Modelo para el usuario
const peliculaSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    puntaje: {
        type: Number,
        unique: false,
        required: [true, 'El puntaje es obligatorio']
    },
    img: {
        type: String,
    },
    fecha_lanzamiento: {
        type: Date,
        required: [true, 'La fecha de lanzamiento es obligatoria']
    }
});
exports.Peliculas = mongoose_1.model('Peliculas', peliculaSchema);
