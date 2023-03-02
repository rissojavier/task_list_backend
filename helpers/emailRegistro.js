import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
    });

    const { email, nombre, token } = datos;
      
    // Enviar el email
    const info = await transport.sendMail({
        from: "Task Lisk App",
        to: email,
        subject: "Verifica tu cuenta en Task Lisk App",
        text: "Verifica tu cuenta en Task Lisk App",
        html: `<p>${nombre}, comprueba tu cuenta en Task List App.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Verificar Cuenta</a> </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);

};

export default emailRegistro;