"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const Usuarios_routes_1 = __importDefault(require("./routes/Usuarios.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const Peliculas_routes_1 = __importDefault(require("./routes/Peliculas.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
//Config CORS
server.app.use(cors_1.default());
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Upload de imagenes
server.app.use(express_fileupload_1.default());
//Rutas de la API
server.app.use('/api/usuarios', Usuarios_routes_1.default);
server.app.use('/api/peliculas', Peliculas_routes_1.default);
//Connect db
mongoose_1.default.connect('mongodb://localhost:27017/db_films', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, autoIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos conectada');
});
server.start(() => {
    console.log(`Servidor correndo en puerto ${server.port}`);
});
