import Lider from "../models/Lider.js";
import generarJWT from "../helpers/ganerarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req,res) => {

    try {
        const { email, nombre } = req.body;

        // Prevenir usuario duplicados
        const existeUsuario = await Lider.findOne({email});

    if (existeUsuario) {
        //console.log(existeUsuario);
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }
        
        // Guardar un nuevo Lider
        const lider = new Lider(req.body); // crea una nueva instancia/objeto de Lider
        const liderGuardado = await lider.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: liderGuardado.token,
        });

        res.json(liderGuardado);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
        console.log(error); // En caso de tener un error al almacenar el registro
    }

};

const registrarAdmin = async (req,res) => {

   const { email, nombre } = req.body;

    // Prevenir usuario duplicados
    const existeUsuario = await Lider.findOne({email});

    if (existeUsuario) {
        //console.log(existeUsuario);
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo Lider
        const lider = new Lider(req.body); // crea una nueva instancia/objeto de Lider
        lider.lider = true;
        const liderGuardado = await lider.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: liderGuardado.token,
        });

        res.json(liderGuardado);
    } catch (error) {
        console.log(error); // En caso de tener un error al almacenar el registro
    }
};

const perfil = (req, res) => {

    const { lider } = req; 

    res.json(lider);
};

const confirmar = async (req,res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Lider.findOne({ token });

    if(!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

    //Se elimina el tonken del usuario y se cambia el valor a true en confirmar 
    try {
        
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        
        res.json({ msg: "Usuario confirmado Correctamente!" });

    } catch (error) {
        console.log(error);
    }

};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Lider.findOne({email});

    // Se ejecuta si el usuario no existe en la base de datos y devuelve un error
    if(!usuario) {
        const error = new Error("El usuario no existe!");
        return res.status(403).json({ msg: error.message });
    }
    
    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("El usuario no esta confirmado!");
        return res.status(403).json({ msg: error.message });
    }
    
    // Verificar el password
    if( await usuario.comprobarPassword(password)) {
        
        // Autenticar usuario
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            lider: usuario.lider,
            token: generarJWT(usuario.id) 
        });
        
        console.log("password correcto");
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    
    const existeLider = await Lider.findOne({email});

    if(!existeLider) {
        const error = new Error("El Usuario no existe");
        return res.status(400).json({ msg: error.message });
    }
    
    try {
        existeLider.token = generarId();
        await existeLider.save();

        // Enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeLider.nombre,
            token: existeLider.token
        });

        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Lider.findOne({ token });

    if(tokenValido) {
        // El token es valido el usuario existe
        res.json({ msg: "Token valido, el Usuario existe" })
    } else {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    };
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    // console.log(token);
    const { password } = req.body;

    const lider = await Lider.findOne({ token });

    if(!lider) {
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message });
    }

    try {
        lider.token = null;
        lider.password = password;
        await lider.save();
        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
    }

};

export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, registrarAdmin };
