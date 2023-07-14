import { obtenerDatos } from './db.js';
import { crearProductos } from "./crearProductos.js";
import { mirarProductos } from "./mirarProductos.js";
import { editarProductos } from "./editarProductos.js";
import { eliminarProductos } from "./eliminarProductos.js";

crearProductos(obtenerDatos);
mirarProductos(obtenerDatos);
editarProductos(obtenerDatos);
eliminarProductos(obtenerDatos);

