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

    if (temperature < -273.15) {
        showModal("La temperatura no puede ser menor que -273,15 °C.");
        return false;
    }

    if (document.getElementById("password").value.length < 9) {
        showModal("La contraseña debe tener al menos 9 caracteres.");
        return false;
    }

    guardarConfiguracion();

    if (temperature < 22 || temperature > 26) {
        showModal("Aviso: la temperatura está fuera del intervalo recomendado de 22 a 26 °C.");
    } else {
        showModal("Datos correctos. La lectura se puede registrar.");
    }

    return false;
}

function guardarConfiguracion() {
    const configuracion = {
        pais: document.getElementById("countryInput").value,
        ciudad: document.getElementById("city").value,
        gps: document.getElementById("gps").value,
        mapa: document.getElementById("mapUrl").value,
        temperatura: document.getElementById("currentTemperature").value,
        maxima: document.getElementById("maxima").value,
        minima: document.getElementById("minima").value
    };

    localStorage.setItem("configuracion", JSON.stringify(configuracion));
}

function cargarConfiguracion() {
    const guardada = localStorage.getItem("configuracion");
    if (!guardada || !document.getElementById("countryInput")) {
        return;
    }

    const configuracion = JSON.parse(guardada);
    document.getElementById("countryInput").value = configuracion.pais || "";
    document.getElementById("city").value = configuracion.ciudad || "";
    document.getElementById("gps").value = configuracion.gps || "";
    document.getElementById("mapUrl").value = configuracion.mapa || "";
    document.getElementById("currentTemperature").value = configuracion.temperatura || "";
    document.getElementById("maxima").value = configuracion.maxima || "";
    document.getElementById("minima").value = configuracion.minima || "";
}

document.addEventListener("DOMContentLoaded", cargarConfiguracion);

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
    const partes = texto.split(",");

    // Formato decimal: 40.513, -3.3486
    if (partes.length === 2) {
        const latitud = Number(partes[0]);
        const longitud = Number(partes[1]);

        if (Number.isFinite(latitud) && Number.isFinite(longitud) &&
            latitud >= -90 && latitud <= 90 &&
            longitud >= -180 && longitud <= 180) {
            return { latitud, longitud };
        }
    }

    // Formato DMS: N 40º 30' 45", O 3º 20' 54"
    const patron = /([NSEOW])\s*(\d+(?:\.\d+)?)\s*[º°]\s*(\d+(?:\.\d+)?)\s*['’]\s*(\d+(?:\.\d+)?)\s*["”]/gi;
    const datos = [...texto.matchAll(patron)];

    if (datos.length !== 2) {
        return null;
    }

    let latitud = null;
    let longitud = null;

    for (const dato of datos) {
        const direccion = dato[1].toUpperCase();
        const grados = Number(dato[2]);
        const minutos = Number(dato[3]);
        const segundos = Number(dato[4]);

        if (minutos >= 60 || segundos >= 60) {
            return null;
        }

        let valor = grados + minutos / 60 + segundos / 3600;

        if (direccion === "N" || direccion === "S") {
            if (latitud !== null || grados > 90) return null;
            if (direccion === "S") valor = -valor;
            latitud = valor;
        } else {
            if (longitud !== null || grados > 180) return null;
            if (direccion === "O" || direccion === "W") valor = -valor;
            longitud = valor;
        }
    }

    if (latitud === null || longitud === null) {
        return null;
    }

    return { latitud, longitud };
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
