import { FileUpload } from "../interfaces/IFileUpload";
import uniqid from 'uniqid';
import path from 'path';
import fs from 'fs'



export default class FileSystem {

    constructor() { }

    guardarImagen(file: FileUpload,filmId:string) {

        return new Promise((resolve,reject) => {

            //path para las imgs
            const path = this.crearCarpetaImgs(filmId);
            //generar nombre unico
            const nombreArchivo = this.genNombreUnico(file.name);

            //Subir imagen
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err){
                    reject(err);
                }else{
                    resolve(nombreArchivo);
                }

            });

        })
    }

    obtenerRutaImgFilm(filmId:string){
        const pathImg = path.resolve(__dirname,'../uploads',filmId);

    }

    private genNombreUnico(nombre: string) {

        const nombreArr = nombre.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const nombreUnico = uniqid();

        return `${nombreUnico}.${extension}`;

    }


    private crearCarpetaImgs(filmId:string) {

        const pathImgs = path.resolve(__dirname, '../uploads/',filmId);
        console.log(pathImgs);

        const existe = fs.existsSync(pathImgs);

        if (!existe) {
            fs.mkdirSync(pathImgs);
        }


        return pathImgs;


    }

    getFotoUrl(filmId:string,img:string){
        const pathImg = path.resolve(__dirname, '../uploads/',filmId,img);


        let existe = fs.existsSync(pathImg);


        if(!existe){
            return path.resolve(__dirname, '../assets/','noimage.png');
        }

        return pathImg;
    }
}