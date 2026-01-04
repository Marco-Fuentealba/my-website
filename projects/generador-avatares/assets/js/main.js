// Versión DEMO: no hace llamadas a API, solo simula la generación del avatar.
document.addEventListener("DOMContentLoaded", () => {
    const btnGenerar = document.getElementById("btn-generar");
    const estiloSelect = document.getElementById("estilo");
    const colorFondoInput = document.getElementById("color-fondo");
    const descripcionTextarea = document.getElementById("descripcion");
    const imagenContainer = document.getElementById("imagen-container");

    btnGenerar.addEventListener("click", () => {
        const estilo = estiloSelect.value;
        const colorFondo = colorFondoInput.value;
        const descripcion = descripcionTextarea.value.trim();

        if (!descripcion) {
            alert("Por favor, escribe una breve descripción del avatar.");
            return;
        }

        // Estado de carga
        imagenContainer.innerHTML = "";

        const loading = document.createElement("div");
        loading.textContent = "Simulando generación de avatar...";
        loading.style.fontSize = "0.95rem";
        loading.style.color = "#6b7280";

        const spinner = document.createElement("div");
        spinner.style.width = "28px";
        spinner.style.height = "28px";
        spinner.style.borderRadius = "50%";
        spinner.style.border = "3px solid #e5e7eb";
        spinner.style.borderTopColor = "#2563eb";
        spinner.style.margin = "0.8rem auto 0";
        spinner.style.animation = "spin 0.9s linear infinite";

        imagenContainer.appendChild(loading);
        imagenContainer.appendChild(spinner);

        // Simulación de tiempo de generación
        setTimeout(() => {
            imagenContainer.innerHTML = "";

            const avatar = document.createElement("div");
            avatar.style.width = "230px";
            avatar.style.height = "230px";
            avatar.style.borderRadius = "999px";
            avatar.style.margin = "0 auto";
            avatar.style.display = "flex";
            avatar.style.flexDirection = "column";
            avatar.style.alignItems = "center";
            avatar.style.justifyContent = "center";
            avatar.style.textAlign = "center";
            avatar.style.padding = "1.2rem";
            avatar.style.color = "#0f172a";
            avatar.style.fontSize = "0.86rem";
            avatar.style.fontWeight = "500";
            avatar.style.boxShadow = "0 12px 30px rgba(15, 23, 42, 0.35)";
            avatar.style.backgroundColor = colorFondo;

            const linea1 = document.createElement("div");
            linea1.textContent = "Avatar de muestra";
            linea1.style.marginBottom = "0.4rem";

            const linea2 = document.createElement("div");
            linea2.textContent = "Estilo: " + estilo;

            const linea3 = document.createElement("div");
            linea3.style.marginTop = "0.4rem";
            linea3.style.fontSize = "0.8rem";
            linea3.style.opacity = "0.85";
            linea3.textContent = descripcion.length > 60
                ? descripcion.slice(0, 60) + "..."
                : descripcion;

            avatar.appendChild(linea1);
            avatar.appendChild(linea2);
            avatar.appendChild(linea3);

            imagenContainer.appendChild(avatar);
        }, 1200);
    });
});
