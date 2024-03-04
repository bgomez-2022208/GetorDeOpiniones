import { Router } from "express";
import {check} from "express-validator"

import { validarCampos } from "../middlewares/validar-campos.js";
import {  comentaryPost,comentaryDelete } from "./comentary.controller.js";
import { validarJWT } from "..//middlewares/validar-jwt.js";

const router = Router();
 
router.post(
    "/",
    [
        validarJWT,
        check("correo", "User is not valido").not().isEmpty(),
        check("comentarios","Comentary is not valid").not().isEmpty(),
         validarCampos,
 
    ], comentaryPost);

    router.delete(
        "/",
        [
            validarJWT,
            check("correo", "El correo es obligatorio").isEmail(),
            check("titulo", "El título de la publicación es obligatorio").notEmpty(),
            check("comentario", "El contenido del comentario es obligatorio").notEmpty(),
        ],
        comentaryDelete
    );
    

export default router;