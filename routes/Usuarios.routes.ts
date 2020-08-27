import { Router, Response, Request } from 'express';
import { Usuario } from '../models/Usuarios.model';


const userRoutes = Router();


userRoutes.post('/create', (req: Request, res: Response) => {

    const user = req.body;

    Usuario.findOne({ email: user.email })
        .then(userFind => {
            if (userFind) {
                return res.json({
                    ok: false,
                    msg: "This email already exist"
                })
            }

            Usuario.create(user)
                
                .then(userDB => {
                    res.json(userDB)
                }).catch(err => {
                    res.json({
                        ok: false,
                        msg:'Something is wrong'
                    })
                })



        })


})

//Ruta para hacer login en la app
userRoutes.post('/login', (req: Request, res: Response) => {

    const user = req.body;

    Usuario.findOne({ email: user.email, password: user.password },'-password')
               .then(userFind => {
            if (!userFind) {
                return res.json({
                    ok: false,
                    msg: "The email or password are wrong"
                })
            }
            res.json({
                ok: true,
                usuario: userFind
            })


        }).catch(err => {
            res.json({
                ok: false,
                msg: "Upss! Something is wrong!"
            })

        })


})






export default userRoutes;
