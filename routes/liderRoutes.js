import express from "express";
const router = express.Router();

import {
    registrar,
    registrarAdmin,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/liderController.js';
import checkAuth from "../middleware/authMiddleware.js";

// Area Publica
router.post("/", registrar);
router.post("/admin", registrarAdmin);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);


// Area Privada
router.get("/perfil", checkAuth, perfil );

export default router;
