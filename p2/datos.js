const paises = ["españa", "portugal", "alemania", "francia", "italia"];

function checkCountry() {
    const country = document.getElementById("countryInput").value.trim().toLowerCase();
    const message = document.getElementById("countryMessage");

    if (country === "" || !paises.includes(country)) {
        message.value = "País no válido";
        return false;
    }

    message.value = "País válido";
    return true;
}

function checkPass() {
    const password = document.getElementById("password").value;
    const message = document.getElementById("passwordMessage");

    if (password.length < 9) {
        message.value = "Corta: necesita 9 caracteres";
    } else if (password.length < 13) {
        message.value = "Evaluación de longitud: media";
    } else {
        message.value = "Evaluación de longitud: larga";
    }
}

function validarFormulario() {
    const temperatureInput = document.getElementById("currentTemperature");
    const temperature = Number(temperatureInput.value);

    if (!checkCountry()) {
        showModal("El país está vacío o no aparece en la lista.");
        return false;
    }

    if (temperatureInput.value === "" || !Number.isFinite(temperature)) {
        showModal("La temperatura actual debe ser un número válido.");
        return false;
    }

    if (document.getElementById("password").value.length < 9) {
        showModal("La contraseña debe tener al menos 9 caracteres.");
        return false;
    }

    if (temperature < 22 || temperature > 26) {
        showModal("Aviso: la temperatura está fuera del intervalo recomendado de 22 a 26 °C.");
    } else {
        showModal("Datos correctos. La lectura se puede registrar.");
    }

    return false;
}

function showModal(message) {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("modal").hidden = false;
}

function closeModal() {
    document.getElementById("modal").hidden = true;
}

// Apartado 2: crea un enlace usando coordenadas decimales o DMS.
function crearEnlaceMapa() {
    const texto = document.getElementById("gps").value.trim();
    const resultado = convertirCoordenadas(texto);
    const mensaje = document.getElementById("mapMessage");

    if (resultado === null) {
        mensaje.textContent = "Coordenadas no válidas";
        return;
    }

    const enlace = "https://maps.google.com/maps?q=" + resultado.latitud + "," + resultado.longitud;
    mensaje.innerHTML = '<a href="' + enlace + '" target="_blank">Ver ubicación en Google Maps</a>';
}

function convertirCoordenadas(texto) {
    let partes = texto.split(",");

    // Formato decimal: 40.513, -3.3486
    if (partes.length === 2 && !isNaN(Number(partes[0])) && !isNaN(Number(partes[1]))) {
        return {
            latitud: Number(partes[0]),
            longitud: Number(partes[1])
        };
    }

    // Formato DMS: N 40º 30' 45", O 3º 20' 54"
    const patron = /([NS])\s*(\d+(?:\.\d+)?)\s*[º°]\s*(\d+(?:\.\d+)?)\s*['’]\s*(\d+(?:\.\d+)?)\s*["”]\s*,?\s*([EOW])\s*(\d+(?:\.\d+)?)\s*[º°]\s*(\d+(?:\.\d+)?)\s*['’]\s*(\d+(?:\.\d+)?)\s*["”]/i;
    const datos = texto.match(patron);

    if (datos === null) {
        return null;
    }

    let latitud = Number(datos[2]) + Number(datos[3]) / 60 + Number(datos[4]) / 3600;
    let longitud = Number(datos[6]) + Number(datos[7]) / 60 + Number(datos[8]) / 3600;

    if (datos[1].toUpperCase() === "S") latitud = -latitud;
    if (datos[5].toUpperCase() === "O" || datos[5].toUpperCase() === "W") longitud = -longitud;

    return { latitud: latitud, longitud: longitud };
}

// Apartado 3: comprobación sencilla sin expresiones regulares.
function validarCorreoSinRegex() {
    const correo = document.getElementById("email").value.trim();
    const partes = correo.split("@");
    let valido = partes.length === 2;

    if (valido) {
        const usuario = partes[0];
        const dominio = partes[1];
        valido = usuario !== "" && dominio !== "" && !correo.includes(" ") &&
            dominio.includes(".") && !dominio.startsWith(".") && !dominio.endsWith(".");
    }

    mostrarResultadoCorreo(valido);
}

// Apartado 3: la misma comprobación usando una expresión regular.
function validarCorreoConRegex() {
    const correo = document.getElementById("email").value.trim();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    mostrarResultadoCorreo(valido);
}

function mostrarResultadoCorreo(valido) {
    document.getElementById("emailMessage").textContent = valido ? "Correo válido" : "Correo no válido";
}
