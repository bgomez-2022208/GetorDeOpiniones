import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/login',
    [
        check('nombre', 'Este no es un correo válido').optional(),
        check('correo', 'Este no es un correo válido').optional(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        validarCampos,
    ],
    login
);

// Exportar el enrutador
export default router;