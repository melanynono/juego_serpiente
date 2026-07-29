
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;
    const serpiente = [
    { x: 12, y: 11 },
    { x: 12, y: 10 },
    { x: 11, y: 10 },
    { x: 10, y: 10 }
    ];

    let intervaloSerpiente = null;
    let direccionActual = "derecha";
    let comida = null;

    
    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTablero(){
      ctx.strokeStyle = "white";

    for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
      for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function pintarParte(lineaX, lineaY, color) {
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }

    function pintarSerpiente() {
      for (let i = 0; i < serpiente.length; i++) {
        if (i == 0) {
            pintarParte(serpiente[i].x, serpiente[i].y, "yellow");
        } else {
            pintarParte(serpiente[i].x, serpiente[i].y, "red");
        }
      }
    }

    function moverDerecha() {
    let cabeza = serpiente[0];
    let nuevaCabeza = {
        x: cabeza.x + 1,
        y: cabeza.y
    };

    // Agregar la nueva cabeza
    serpiente.unshift(nuevaCabeza);

    // Eliminar la cola
    serpiente.pop();
}

function moverIzquierda() {
    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x - 1,
        y: cabeza.y
    };

    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverArriba() {
    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y - 1
    };

    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverAbajo() {
    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y + 1
    };

    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function cambiarDireccion(direccion) {
direccionActual = direccion;
}

function iniciarJuego() {

    if (intervaloSerpiente != null) {
        return;
    }

    intervaloSerpiente = setInterval(moverSerpiente, 1000);

}

function pausarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
}

function moverSerpiente() {
    if (direccionActual === "derecha") {
        moverDerecha();
    } else if (direccionActual === "izquierda") {
        moverIzquierda();
    } else if (direccionActual === "arriba") {
        moverArriba();
    } else if (direccionActual === "abajo") {
        moverAbajo();
    }

    dibujarTodo();

}

function pintarComida() {

    let columnas = canvas.width / TAMANIO_CELDA;
    let filas = canvas.height / TAMANIO_CELDA;

    let posicionX = Math.floor(Math.random() * columnas);
    let posicionY = Math.floor(Math.random() * filas);

    comida = {
        x: posicionX,
        y: posicionY
    };

    pintarParte(comida.x, comida.y, "green");
}

function atrapaComida() {

    let cabeza = serpiente[0];

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        return true;
    }

    return false;
}

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarComida();
      pintarSerpiente();
    }
