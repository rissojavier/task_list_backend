import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    tarea: {
        type: String,
        required: true,
    },
    completado: {
        type: Boolean,
        required: true,
        default: false,
    },
    lider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lider",
        required: true,
    },
    responsable: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        default: new Date().getDate() + 1,
    },

}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;