import {Schema,model,Document} from 'mongoose';

//Modelo para el usuario

const peliculaSchema = new Schema({

    titulo:{
        type:String,
        required:[true,'El titulo es obligatorio']
    },
    descripcion:{
        type:String,
        required:[true,'La descripción es obligatoria']
    },
    puntaje:{
        type:Number,
        unique:false,
        
        required:[true,'El puntaje es obligatorio']
    },
    img:{
        type:String,
        // required:[true,'La imagen es necesaria']
    },
    fecha_lanzamiento:{
        type:Date,
        required:[true,'La fecha de lanzamiento es obligatoria']
    }

});

interface IPeliculas extends Document{
    titulo:string;
    descripcion:string;
    puntaje:number;
    fecha_lanzamiento:Date;
    
}


export const Peliculas = model<IPeliculas>('Peliculas',peliculaSchema);
