import { Router } from "express";
import {check} from "express-validator"

import { validarCampos } from "../middlewares/validar-campos.js";
import {  comentaryPost } from "./comentary.controller.js";
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

export default router;