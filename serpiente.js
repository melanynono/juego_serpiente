
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
    let puntaje = 0;
    let velocidad = 700;
    let sonidoComer = new Audio("sonidos/comida.mp3");
    let musicaFondo = new Audio("sonidos/sonido.mp3");
    let sonidoGameOver = new Audio("sonidos/game over.mp3");

    musicaFondo.loop = true;
    musicaFondo.volume = 0.3;
    sonidoComer.volume = 0.8;

    
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

//Evitar que la serpiente retroceda sobre si misma
function cambiarDireccion(direccion) {

    if (direccionActual === "derecha" && direccion === "izquierda") {
        return;
    }

    if (direccionActual === "izquierda" && direccion === "derecha") {
        return;
    }

    if (direccionActual === "arriba" && direccion === "abajo") {
        return;
    }

    if (direccionActual === "abajo" && direccion === "arriba") {
        return;
    }

    direccionActual = direccion;
}
function iniciarJuego() {

    if (intervaloSerpiente != null) {
        return;
    }

    musicaFondo.play();

    intervaloSerpiente = setInterval(moverSerpiente, velocidad);

}

function pausarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;

    musicaFondo.pause();
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

    if (verificarLimites()) {
        pausarJuego();

        sonidoGameOver.currentTime = 0;
        sonidoGameOver.play();

        mostrarGameOver();

        return;
    }

    //si la serpiente toca su cuerpo pierde
    if (verificarColisionCuerpo()) {
        pausarJuego();

        sonidoGameOver.currentTime = 0;
        sonidoGameOver.play();

mostrarGameOver();

return;
    }

if (atrapaComida()) {

    puntaje++;

    sonidoComer.currentTime = 0;
    sonidoComer.play();

    let cola = serpiente[serpiente.length - 1];

    let nuevoSegmento = {};

    if (direccionActual === "derecha") {
        nuevoSegmento = {
            x: cola.x - 1,
            y: cola.y
        };

    } else if (direccionActual === "izquierda") {
        nuevoSegmento = {
            x: cola.x + 1,
            y: cola.y
        };

    } else if (direccionActual === "arriba") {
        nuevoSegmento = {
            x: cola.x,
            y: cola.y + 1
        };

    } else if (direccionActual === "abajo") {
        nuevoSegmento = {
            x: cola.x,
            y: cola.y - 1
        };
    }

    serpiente.push(nuevoSegmento);

    document.getElementById("puntaje").textContent = puntaje;

    comida = null;

    if (puntaje % 2 === 0) {

        velocidad -= 50;

        if (velocidad < 100) {
            velocidad = 100;
        }

        clearInterval(intervaloSerpiente);
        intervaloSerpiente = setInterval(moverSerpiente, velocidad);
        }
    }

    dibujarTodo();
}

function verificarLimites() {

    let cabeza = serpiente[0];

    let columnas = canvas.width / TAMANIO_CELDA;
    let filas = canvas.height / TAMANIO_CELDA;

    if (
        cabeza.x < 0 || 
        cabeza.x >= columnas ||
        cabeza.y < 0 || 
        cabeza.y >= filas
    ) {
        return true;
    }

    return false;
}

function pintarComida() {
    if (comida == null) {

        let columnas = canvas.width / TAMANIO_CELDA;
        let filas = canvas.height / TAMANIO_CELDA;

        comida = {
            x: Math.floor(Math.random() * columnas),
            y: Math.floor(Math.random() * filas)
        };
    }

    pintarParte(comida.x, comida.y, "green");
}

function atrapaComida() {

    let cabeza = serpiente[0];

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        return true;
    }

    return false;
}

function reiniciarJuego() {
    pausarJuego();

    serpiente.splice(0, serpiente.length);

    serpiente.push(
        { x: 12, y: 11 },
        { x: 12, y: 10 },
        { x: 11, y: 10 },
        { x: 10, y: 10 }
    );

    direccionActual = "derecha";
    comida = null;
    puntaje = 0;
    velocidad = 700;

    document.getElementById("puntaje").textContent = puntaje;

    musicaFondo.pause();
    musicaFondo.currentTime = 0;  

    dibujarTodo();
}

//La serpiente pierde si toca su propio cuerpo
function verificarColisionCuerpo() {

    let cabeza = serpiente[0];

    for (let i = 1; i < serpiente.length; i++) {

        if (cabeza.x === serpiente[i].x &&
            cabeza.y === serpiente[i].y) {

            return true;
        }
    }

    return false;
}

function mostrarGameOver() {

    // Fondo semitransparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto GAME OVER
    ctx.font = "bold 55px Arial";
    ctx.fillStyle = "#ff3b3b";
    ctx.fillText("GAME OVER", 150, 180);

    // Puntaje
    ctx.font = "28px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Puntaje: " + puntaje, 220, 240);
}

    function dibujarTodo() {
        limpiarCanvas();
        pintarComida();
        pintarSerpiente();
    }
