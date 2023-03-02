import Task from "../models/Task.js";
import Lider from "../models/Lider.js";

const agregarTask = async (req, res) => {
    const task = new Task(req.body);
    task.lider = req.lider._id;
    
    // Busca el email del responsable en la DB y verifica si existe
    const { responsable } = req.body;
    const existeUsuario = await Lider.findOne({ email: responsable });

    if (!existeUsuario) {
        return res.status(404).json({ msg: "El email del responsable no existe!" });
    }

    try {
        const taskAlmacenado = await task.save();
        res.json(taskAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerTasks = async (req,res) => {
    const task = await Task.find()
        .where("lider")
        .equals(req.lider);

    res.json(task);
};

const obtenerTasksUser = async (req,res) => { 

    const tasks = await Task.find({ "responsable": req.lider.email })

    res.json(tasks);
};

const obtenerTask = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if( !task ){
        return res.status(404).json({ msg: "Tarea no encontrada" });
    };
    
    if( task.lider._id.toString() !== req.lider._id.toString() ) {
       return res.json({ msg: "Accion no valida" });
    }

    res.json(task);
};

const actualizarTask = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if( !task ){
        return res.status(404).json({ msg: "Tarea no encontrada" });
    };

    if( task.lider._id.toString() !== req.lider._id.toString() ) {
       return res.json({ msg: "Accion no valida" });
    };

    // Actualizar tarea
    task.tarea = req.body.tarea || task.tarea;
    task.completado = req.body.completado || task.completado; //  task.completado = true {task.completado ? !task.completado : task.completado}
    task.responsable = req.body.responsable || task.responsable;
    task.fecha = req.body.fecha || task.fecha;

    try {
        const taskActualizado = await task.save();
        res.json(taskActualizado);
    } catch (error) {
        console.log(error);
    }
};

const eliminartask = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if( !task ){
        return res.status(404).json({ msg: "Tarea no encontrada" });
    };

    if( task.lider._id.toString() !== req.lider._id.toString() ) {
       return res.json({ msg: "Accion no valida" });
    };

    try {
        await task.deleteOne();
        res.json({ msg: "Tarea eliminada!" })
    } catch (error) {
        console.log(error);
    }
};

const estadoTask = async (req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if( !task ){
        return res.status(404).json({ msg: "Tarea no encontrada" });
    };

    // Cambiar estado de la tarea

    if(task.completado) {
        task.completado = false
    } else {
        task.completado = true
    }

    try {
        const taskActualizado = await task.save();
        res.json(taskActualizado);
    } catch (error) {
        console.log(error);
    }

};

export {
    agregarTask,
    obtenerTasks,
    obtenerTask,
    obtenerTasksUser,
    actualizarTask,
    eliminartask,
    estadoTask
};