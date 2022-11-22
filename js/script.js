let numCuadrados = 9;
let colores = [];
let colorGenerado;
let cuadrados = document.querySelectorAll(".cuadrado");
let colorAleatorio = document.getElementById("colorAleatorio");
let mensaje = document.querySelector("#mensaje");
let h1 = document.querySelector("h1");
let botonReset = document.getElementById("reset");
let dificultad = document.querySelectorAll(".modo");
let aciertos = 0;
let fallos = 0;
let acierto = document.querySelector("#aciertos");
let fallo = document.querySelector("#fallos");

init();

function init() {
    setupDificultad();
    setupCuadrados();
    reset();
}
function setupCuadrados() {
    for (let i = 0; i < cuadrados.length; i++){
        cuadrados[i].addEventListener("click", function(){
            let colorClickeado = this.style.backgroundColor;
            if (colorClickeado === colorGenerado ){
                aciertos++;
                

                if(aciertos <3){
                    reset();
                    acierto.textContent = "ACIERTOS:"+String(aciertos);
                    mensaje.textContent = "¡Correcto sigue jugando!";
                    botonReset.textContent = "Más colores!";
                    fallo.textContent = "FALLOS:"+String(fallos);
                   
                }else{

               
                    acierto.textContent = "ACIERTOS:"+String(aciertos);
                    mensaje.textContent = "¡Correcto! Has ganado!";
                    botonReset.textContent = "Vuelve a jugar!";
                    aciertos = 0;
                    fallos = 0;
                    fallo.textContent = "FALLOS";
                    setTimeout(reset,1500)

                }
                
            } else {
                this.style.backgroundColor = "#FCEEF8";
                mensaje.textContent = "¡Vuelve a intentarlo!";
                fallos++;
                fallo.textContent = "FALLOS:"+String(fallos);

            

                if (fallos === 3) {
                    mensaje.textContent = "Has perdido.";
                    botonReset.textContent = "Jugar de nuevo";
                    fallo.textContent = "FALLOS:"+String(fallos);
                    fallos = 0;
                    aciertos = 0;
                    setTimeout(reset, 1500)
                }
            }
        });
    }
}

function setupDificultad() {
    for (let i = 0; i < dificultad.length; i++) {
        dificultad[i].addEventListener("click", function(){
            dificultad[0].classList.remove("seleccionado");
            dificultad[1].classList.remove("seleccionado");
            this.classList.add("seleccionado");
            this.textContent === "Fácil" ? numCuadrados = 6: numCuadrados = 9;
            reset();
        });
    }
}

function reset() {
    colores = generarColores(numCuadrados);
    colorGenerado = generarColor();
    colorAleatorio.textContent = colorGenerado;
   
    for (let i = 0; i < cuadrados.length; i++){
        if (colores[i]) {
            cuadrados[i].style.display = "block";
            cuadrados[i].style.background = colores[i];
            if (aciertos<4) {
                acierto.textContent = "ACIERTOS";
            }
          
            if (fallos === 0) {
                fallo.textContent = "FALLOS";
            }
            if (fallos <= 3) {
                acierto.textContent = "ACIERTOS";
                fallo.textContent = "FALLOS";
            }
        } else {
            cuadrados[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "#007ABB";
    botonReset.textContent = "Colores Nuevos";
    mensaje.textContent = "";
    
}

botonReset.addEventListener("click", function(){
    reset();    
});

function cambiarColores(color) {
    for (let i = 0; i < cuadrados.length; i++){
        cuadrados[i].style.background = color;
    }
}

function generarColor() {
    let azar = Math.floor(Math.random() * colores.length);
    return colores[azar];
}

function generarColores(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(colorAzar());
    }
    return arr;
}

function colorAzar() {
    let r =  Math.floor(Math.random() * 256);
    let g =  Math.floor(Math.random() * 256);
    let b =  Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
