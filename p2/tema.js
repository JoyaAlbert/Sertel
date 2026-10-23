const botonTema = document.getElementById("botonTema");

function cambiarTema() {
    document.body.classList.toggle("tema-oscuro");

    const oscuro = document.body.classList.contains("tema-oscuro");
    try {
        localStorage.setItem("modoOscuro", oscuro ? "si" : "no");
    } catch (error) {
    }
    botonTema.textContent = oscuro ? "Modo claro" : "Modo oscuro";
}

let modoGuardado = "no";
try {
    modoGuardado = localStorage.getItem("modoOscuro") || "no";
} catch (error) {
    modoGuardado = "no";
}

if (modoGuardado === "si") {
    document.body.classList.add("tema-oscuro");
    botonTema.textContent = "Modo claro";
}

botonTema.onclick = cambiarTema;
