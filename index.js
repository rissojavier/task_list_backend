import express from "express";
import dotenv from  "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import liderRoutes from "./routes/liderRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL || "https://task-list-frontend.vercel.app"];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del Request esta permitido
            console.log(dominiosPermitidos.indexOf(origin));
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
};

// configuracion de CORS
app.use(cors({ origin: '*' }))

app.use("/api/lideres", liderRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
