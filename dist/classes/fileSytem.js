"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    constructor() { }
    guardarImagen(file, filmId) {
        return new Promise((resolve, reject) => {
            //path para las imgs
            const path = this.crearCarpetaImgs(filmId);
            //generar nombre unico
            const nombreArchivo = this.genNombreUnico(file.name);
            //Subir imagen
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(nombreArchivo);
                }
            });
        });
    }
    obtenerRutaImgFilm(filmId) {
        const pathImg = path_1.default.resolve(__dirname, '../uploads', filmId);
    }
    genNombreUnico(nombre) {
        const nombreArr = nombre.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const nombreUnico = uniqid_1.default();
        return `${nombreUnico}.${extension}`;
    }
    crearCarpetaImgs(filmId) {
        const pathImgs = path_1.default.resolve(__dirname, '../uploads/', filmId);
        console.log(pathImgs);
        const existe = fs_1.default.existsSync(pathImgs);
        if (!existe) {
            fs_1.default.mkdirSync(pathImgs);
        }
        return pathImgs;
    }
    getFotoUrl(filmId, img) {
        const pathImg = path_1.default.resolve(__dirname, '../uploads/', filmId, img);
        let existe = fs_1.default.existsSync(pathImg);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/', 'noimage.png');
        }
        return pathImg;
    }
}
exports.default = FileSystem;
