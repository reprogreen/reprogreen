exports.handler = async (event) => {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método no permitido",
    };
  }

  try {
    const datos = JSON.parse(event.body);

const fecha = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires"
});

let mensaje = "";

if (datos.tipo === "visitante") {

    mensaje = `
🟢 NUEVO VISITANTE

🕒 Fecha: ${fecha}
`;

} else if (datos.tipo === "renovacion") {

    mensaje = `
♻️ RENOVACIÓN REPROCANN

👤 Nombre: ${datos.nombre}
🪪 DNI: ${datos.dni}
📞 Teléfono: ${datos.telefono}
📧 Email: ${datos.email}

💳 Comprobante de pago: ✅ Adjuntado

🆔 Trámite: ${datos.tramite}

🕒 Fecha: ${fecha}
`;

if (datos.tipo === "contacto") {

    mensaje = `
📩 NUEVO MENSAJE DE CONTACTO

👤 Nombre: ${datos.nombre}
📧 Email: ${datos.email}

💬 Mensaje:
${datos.mensaje}

🕒 Fecha: ${fecha}
`;

}

} else {

    mensaje = `
🟢 NUEVA SOLICITUD REPROGREEN

👤 Nombre: ${datos.nombre}
🪪 DNI: ${datos.dni}
📞 Teléfono: ${datos.telefono}
📧 Email: ${datos.email}

💳 Comprobante de pago: ✅ Adjuntado

🆔 Trámite: ${datos.tramite}

🕒 Fecha: ${fecha}
`;

}

    const respuesta = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensaje,
        }),
      }
    );

    const resultado = await respuesta.json();

return {
  statusCode: 200,
  body: JSON.stringify({
    telegram: resultado,
    token: TOKEN ? "OK" : "NO",
    chat: CHAT_ID
  }),
};

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };

  }

};