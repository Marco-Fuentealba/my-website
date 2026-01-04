
// DEMO NutriChat – Simulación avanzada sin backend
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

let state = {
  goal: null,
  edad: null,
  genero: null,
  peso: null,
  estatura: null,
  actividad: null,
  condicion: null,
  fase: "objetivo"
};

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", sender);
  const bubble = document.createElement("span");
  bubble.innerHTML = text.replace(/\n/g, "<br>");
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function bot(text) { addMessage(text, "bot"); }
function user(text) { addMessage(text, "user"); }

// Mensaje inicial
bot("Hola 👋 Soy NutriChat (versión DEMO). Cuéntame tu *objetivo principal*: bajar de peso, subir masa muscular o mantener.");

function generarTablaDemo() {
  return `
  <table class="dieta">
    <thead>
      <tr>
        <th>Día</th><th>Comida</th><th>Alimentos</th><th>Receta</th><th>Calorías</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Lunes</td><td>Desayuno</td><td>Avena + plátano + semillas</td><td>Bow de avena</td><td>350</td></tr>
      <tr><td>Lunes</td><td>Almuerzo</td><td>Pollo + arroz + ensalada</td><td>Plato balanceado</td><td>550</td></tr>
      <tr><td>Lunes</td><td>Cena</td><td>Omelette + verduras</td><td>Omelette verde</td><td>400</td></tr>
    </tbody>
  </table>
  `;
}

function responderDemoUsuario(text) {
  const lower = text.toLowerCase();

  if (state.fase === "objetivo") {
    state.goal = text;
    state.fase = "edad";
    return bot("Perfecto. Para ayudarte necesito tu **edad**.");
  }

  if (state.fase === "edad") {
    state.edad = text;
    state.fase = "genero";
    return bot("Gracias. Ahora dime tu **género** (hombre, mujer, otro).");
  }

  if (state.fase === "genero") {
    state.genero = text;
    state.fase = "peso";
    return bot("Perfecto. ¿Cuál es tu **peso actual en kg**?");
  }

  if (state.fase === "peso") {
    state.peso = text;
    state.fase = "estatura";
    return bot("¿Y tu **estatura en centímetros**?");
  }

  if (state.fase === "estatura") {
    state.estatura = text;
    state.fase = "actividad";
    return bot("Ahora, ¿cuál es tu **nivel de actividad física**? (sedentario, poco activo, activo, muy activo)");
  }

  if (state.fase === "actividad") {
    state.actividad = text;
    state.fase = "condicion";
    return bot("¿Tienes alguna **condición o enfermedad relevante**? (ej: resistencia a la insulina, hipertensión, ninguna)");
  }

  if (state.fase === "condicion") {
    state.condicion = text;
    state.fase = "final";

    const tabla = generarTablaDemo();

    return bot(`
      Excelente, ya tengo todos tus datos.<br><br>
      <strong>Objetivo:</strong> ${state.goal}<br>
      <strong>Calorías estimadas:</strong> entre 1800 y 2100 kcal/día (aprox.)<br><br>
      Aquí tienes un ejemplo de *plan alimenticio de demostración*:<br><br>
      ${tabla}
      <br>
      <em>Esta es una demostración estática para portafolio. No reemplaza a un profesional de nutrición.</em>
    `);
  }

  // Si ya terminó
  bot("Si deseas reiniciar la demo, recarga la página ✨");
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  user(text);
  userInput.value = "";
  responderDemoUsuario(text);
});
