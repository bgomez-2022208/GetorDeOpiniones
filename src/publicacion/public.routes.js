import { Router } from "express";
import { check } from "express-validator";
import {
    getPublic,
    getPublicacionById,
    createPublic,
    updatePublic,
    publicacionDelete,
} from "./public.controller.js";



import {
  existePublicacionById,
} from "../helpers/db-validators.js";


import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "..//middlewares/validar-jwt.js";

const router = Router();

router.get("/", getPublic);

router.get(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existePublicacionById),
        validarCampos,
    ],
    getPublicacionById
);

router.post(
    "/",
    [
      validarJWT,
      check("titulo", "El titulo es obligatorio").not().isEmpty(),
      check("categoria", "La categoria es obligatoria").not().isEmpty(),
      check("textoPrincipal", "El texto de la publicacion es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    createPublic
  );


  router.put(
    "/:id",
    [
      validarJWT,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existePublicacionById),
      validarCampos,
    ],
    updatePublic
  );


  router.delete(
    "/:id",
    [
    validarJWT,
    check(`titulo`,`titulo no aceptado`).not().isEmpty(),
    validarCampos,
    ], 
    publicacionDelete
   );


  export default router;