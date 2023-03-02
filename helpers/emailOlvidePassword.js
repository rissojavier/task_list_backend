import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {

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
        subject: "Restablece tu Password",
        text: "Restablece tu Password",
        html: `<p>${nombre}, has solicitado restablecer tu password para tu cuenta en Task List App.</p>

            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a> </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);

};

export default emailOlvidePassword;