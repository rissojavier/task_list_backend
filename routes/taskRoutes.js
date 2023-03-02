import express from "express";
const router = express.Router();
import {
    agregarTask,
    obtenerTasks,
    obtenerTask,
    obtenerTasksUser,
    actualizarTask,
    eliminartask,
    estadoTask
} from "../controllers/taskController.js";

import checkAuth from "../middleware/authMiddleware.js";

router
    .route("/")
    .post( checkAuth, agregarTask )
    .get( checkAuth, obtenerTasks )
    .get( checkAuth, obtenerTasksUser );
    
router
    .route("/user")
    .get( checkAuth, obtenerTasksUser )
    
router  
.route("/:id")
.get(checkAuth, obtenerTask)
.put(checkAuth, actualizarTask)
.delete(checkAuth, eliminartask);

router
    .route("/user/:id")
    .put(checkAuth, estadoTask);

export default router;