import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} from "./user.controller.js";
import {
  existenteEmail,
  existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
//import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getUsers);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  getUserById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existenteEmail),
    validarCampos,
  ],
  createUser
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  updateUser
);


export default router;