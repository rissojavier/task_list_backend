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

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

app.use("/api/lideres", liderRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
