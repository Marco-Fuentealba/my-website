const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    // Allow only POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Method Not Allowed" }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const nombre = (body.nombre || "").trim();
    const email = (body.email || "").trim();
    const tipoProyecto = (body.tipoProyecto || "").trim();
    const mensaje = (body.mensaje || "").trim();

    // Basic validation
    if (!nombre || !email || !mensaje) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Faltan campos obligatorios." }),
      };
    }

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

    if (!EMAIL_USER || !EMAIL_PASS) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Faltan variables de entorno (EMAIL_USER/EMAIL_PASS)." }),
      };
    }

    // Use SMTP (587 / STARTTLS) - usually the most compatible in hosted environments
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const subject = `Nuevo contacto: ${tipoProyecto || "Consulta"} - ${nombre}`;

    const text = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Tipo de proyecto: ${tipoProyecto || "No seleccionado"}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      text,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("Error en función contact:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Error al enviar correo." }),
    };
  }
};
