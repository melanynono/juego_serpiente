
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;


    

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
      ctx.beginPath();

      ctx.moveTo(50, 50);
      ctx.lineTo(250, 50);

      ctx.stroke();
    }


    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
    }

