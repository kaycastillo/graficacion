// ====================================== VARIABLES GLOBALES ======================================
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var x=0, y=0, dibujando=false, color='black', grosor=1;
var inicialX=0, inicialY=0, finalX=0, finalY=0;
var radioButtons = document.querySelectorAll('input[name="tool"]');
var Tool = "lapiz";

function handleTool(myTool){
    Tool = myTool.value;
}

// ====================================== CANVAS ======================================

//Definir color
function defColor(c){
    color=c;
}

//Definir grosor
function defGrosor(g){
    grosor=g;
}

//Dibujar de Punto0 a Punto1
function dibujar(x0,y0,x1,y1){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
}

//Dibujar Pixel por Pixel
function dibujarPixel(x,y){
    let roundedX = Math.round(x);
    let roundedY = Math.round(y);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(roundedX,roundedY, grosor, grosor);
    ctx.fill();
}

//Limpiar Canvas
function Limpiar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ====================================== EVENTOS ======================================
canvas.addEventListener('mousedown', function(e){
    switch(Tool){
        case 'lapiz':
            x = e.clientX-rect.left;
            y = e.clientY-rect.top;
            dibujando = true;
        break;
        case 'linea':
            inicialX = e.clientX-rect.left;
            inicialY = e.clientY-rect.top;
            dibujando = true; 
        break;
    }
})

canvas.addEventListener('mousemove', function(e){

    switch(Tool){
        case 'lapiz':
            if(dibujando===true){
                dibujar(x, y, e.clientX-rect.left, e.clientY-rect.top);
                x = e.clientX-rect.left;
                y = e.clientY-rect.top;
            }
        break;
        case 'linea':
            if(dibujando===true){
                // Limpiar();
                // dibujar(inicialX, inicialY, e.clientX-rect.left, e.clientY-rect.top);        // <=== Para previsualizar la linea antes de dibujarla
            }
        break;
    }
})

canvas.addEventListener('mouseup', function(e){
    switch(Tool){
        case 'lapiz':
            dibujar(x, y, e.clientX-rect.left, e.clientY-rect.top);
            x = 0;
            y = 0;
            dibujando = false;
        break;

        case 'linea':
            dibujando = false;
            finalX = e.clientX-rect.left;
            finalY = e.clientY-rect.top;
            algoritmo(inicialX,inicialY,finalX,finalY);   
        break;
    }
})

// ====================================== ALGORITMOS ======================================

