import { Router, Response, Request } from 'express';
import { Peliculas } from '../models/Peliculas.model';
import { FileUpload } from '../interfaces/IFileUpload';

import FileSystem from '../classes/fileSytem';

const peliculasRoutes = Router();
const fileSystem = new FileSystem();


peliculasRoutes.get('/getAll', (req: Request, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10


    Peliculas.find({})
        .limit(10)
        .skip(skip)
        .sort({ _id: -1})
        .exec()
        .then(peliculasDB => {

            if (peliculasDB.length != 0) {
                return res.json(peliculasDB);
            }

            res.json(peliculasDB)


        })


})

peliculasRoutes.get('/search/:txt', (req: Request, res: Response) => {

    let searchTxt = String(req.params.txt);
   
    
 

    Peliculas.find({titulo:{$regex:searchTxt, $options: 'i'}})
        .sort({ _id: -1})
        .exec()
        .then(peliculasDB => {

            if (peliculasDB.length != 0) {
                return res.json(peliculasDB);
            }

            res.json(peliculasDB)


        })


})



peliculasRoutes.get('/getOne/:id', (req: Request, res: Response) => {

    let id = String(req.params.id);


    Peliculas.findOne({_id:id})
    .then(filmDB=>{
      
        
        if(!filmDB){
            return res.json({
                ok:false,
                msg:"That movie doesn't exist!"
            })
        }

        res.json(filmDB)
    }).catch(err=>{
        res.json({
            ok:false,
            mgs:"Upss! Something went wrong"
        })
    })


})

peliculasRoutes.delete('/deleteOne/:id', (req: Request, res: Response) => {

    let id = String(req.params.id);


    Peliculas.findByIdAndRemove({_id:id})
    .then(filmDB=>{
      
        
        if(!filmDB){
            return res.json({
                ok:false,
                msg:"That movie doesn't exist!"
            })
        }

        res.json({
            ok:true,
            msg:"Film delete succesfully"
        })
    }).catch(err=>{
        res.json({
            ok:false,
            mgs:"Upss! Something went wrong"
        })
    })


})



peliculasRoutes.post('/create', (req: Request, res: Response) => {

    const film = req.body;



    Peliculas.collection.dropIndexes().then(resp => {

        Peliculas.create(film)
            .then(filmDB => {
                res.json(filmDB)
            }).catch(err => {
                console.log(err);

                res.json({
                    ok: false,
                    msg: "Upss! Ocurrió un error!"
                })
            })

    })






});


peliculasRoutes.put('/update', (req: Request, res: Response) => {

    const film = req.body;




        Peliculas.findByIdAndUpdate({_id:film._id}, film)
            .then(filmDB => {
                res.json(filmDB)
            }).catch(err => {
                console.log(err);

                res.json({
                    ok: false,
                    msg: "Upss! Ocurrió un error!"
                })
            })

  






})


//Ruta para subir fotos
peliculasRoutes.post('/upload', async (req: any, res: Response) => {
    const file = req.files.image;
    const filmId = req.headers.filmid;
    console.log(filmId);


    if (!file) {
        return res.status(400).json({
            ok: false,
            msg: "No se subió ningun archivo"
        })
    }



    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo que está tratando de subir no es una imagen'
        })
    }

    let nombreArchivo = await fileSystem.guardarImagen(file, filmId);



    if (nombreArchivo) {
        Peliculas.updateOne({ _id: filmId }, { img: nombreArchivo })
            .then(resp => {

                res.json({
                    ok:true,
                    msg:'La imagen se subió correctamente'
                });

            })


    } else {
        res.json({
            ok: false,
            msg: 'Upsss! algo salió mal.'
        })
    }


});

peliculasRoutes.get('/image/:filmId/:img',(req:any,res:Response)=>{
    const filmId = req.params.filmId;
    const img = req.params.img;

    const pathImg = fileSystem.getFotoUrl(filmId,img)



    res.sendFile(pathImg)
})




export default peliculasRoutes;
