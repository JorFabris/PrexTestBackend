import {Schema,model,Document} from 'mongoose';

//Modelo para el usuario

const userSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    apellido:{
        type:String,
        required:[true,'El apellido es obligatorio']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El correo electronico es obligatorio']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    }

});

interface IUsuario extends Document{
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    password:string;
}


export const Usuario = model<IUsuario>('Usuarios',userSchema);
