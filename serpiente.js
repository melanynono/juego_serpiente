
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;
    const serpiente = [
    { x: 13, y: 10 },
    { x: 12, y: 10 },
    { x: 11, y: 10 },
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 9, y: 9 },
    { x: 9, y: 8 },
    { x: 9, y: 7 },
    { x: 9, y: 6 },
    { x: 9, y: 5 },
    { x: 8, y: 5 },
    { x: 7, y: 5 }
    ];

    
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

    function pintarParte(lineaX, lineaY) {
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }

    function pintarSerpiente() {
      for (let i = 0; i < serpiente.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "pink";
        } else {
            ctx.fillStyle = "green";
        }

        let x = serpiente[i].x * TAMANIO_CELDA;
        let y = serpiente[i].y * TAMANIO_CELDA;

        ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      }
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
    }
