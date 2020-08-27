import Server from "./classes/server";
import userRoutes from "./routes/Usuarios.routes";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import peliculasRoutes from "./routes/Peliculas.routes";
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server();

//Config CORS
server.app.use(cors())

//Body parser
server.app.use( bodyParser.urlencoded({ extended:true }));

server.app.use( bodyParser.json() );


//Upload de imagenes
server.app.use( fileUpload() );

//Rutas de la API

server.app.use('/api/usuarios',userRoutes)
server.app.use('/api/peliculas',peliculasRoutes)



//Connect db

mongoose.connect('mongodb://localhost:27017/db_films',
                {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true,autoIndex:true},(err)=>{
                    if(err)throw err;
                    console.log('Base de datos conectada');
                    

                    
                })


server.start(()=>{
    console.log(`Servidor correndo en puerto ${server.port}`);
    
})
