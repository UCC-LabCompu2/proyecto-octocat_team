var interval;
var xm = [];
var ym = [];
var xs =0;
var ys=50;

/**
 * Esta funcion calcula la corriente total y la resistencia equivalente y el valor de cada diferencia de potencial
 * en las resistencias y los ubica en su respectivo casillero.
 * @method Calculo de Req, It, y diferencias de potencial en cada resistencia
 * @param No hay parametros
 * @return No hay retorno de valores
 */

function CalcularSerie() {

    var valor = [];
    var multiplicador = [];
    var resistencias = [];
    var fem;
    var Req = 0;
    var It = 1;
    var sel;

    for(i=0; i < 7; i++) {
        valor[i] = document.getElementsByName("valR")[i].value;
        if(valor[i] < 0 /*Agregar comprobacion solo numeros.*/){
            alert("El valor de la resistencia " + (i+1) + " es invalido. Por favor verifique los datos.");
            document.getElementsByName("valR")[i].value = "";
        }else if (valor[i] >= 0){

        }else{
            valor[i] = 0;
        }
        //alert(valor)
    }
    //alert(valor);
    for(i=0; i<7; i++){
        sel = document.getElementsByName("multiploOhmR")[i];
        switch(sel.options[sel.selectedIndex].value){
            case "mOhm":
                multiplicador[i] = 0.001;
                break;
            case "Ohm":
                multiplicador[i] = 1;
                break;
            case "KOhm":
                multiplicador[i] = 1000;
                break;
            case "MOhm":
                multiplicador[i] = 1000000;
                break;
            default:
                multiplicador[i] = 1;
                break;
        }
    }

    for(i=0 ; i<7; i++){
        resistencias[i] = valor[i] * multiplicador[i];
    }

    for(i=0; i<7; i++){
        Req += resistencias[i];
    }

    fem = document.getElementById("valfem1").value;

    if(Req > 0) {
        It = fem / Req;
        document.getElementById("valIt").value = It.toFixed(3);
        document.getElementById("Req").value = Req.toFixed(3);
        for(i=0; i<7; i++){
            document.getElementsByName("valV")[i].value = (It * resistencias[i]).toFixed(3);
        }

        var x0=20, y0=20, d=10;

        for(i=0; i<7; i++){
            if(valor[i] =! 0){
                var x4 = x0 + (i  * d);

            }
            else {
                DibujarLinea("canvasSerie", x0 + (i) * d);
                alert("HOLA")
            }
        }

        if(interval)
            clearInterval(interval);

        interval = setInterval(function() {  CircuitoSerie("canvasSerie", 30, 50, 10, resistencias); }, 1);
    }else {
        alert("Valor de resistencias invalidos.");
    }
}

/**
 * Esta funcion calcula la corriente total y la resistencia equivalente y el valor de cada corriente
 * en las resistencias y los ubica en su respectivo casillero.
 * @method Calculo de Req, It, y corriente en cada resistencia
 * @param No hay parametros
 * @return No hay retorno de valores
 */

function CalcularParalelo() {
    var valor = [];
    var multiplicador = [];
    var resistencias = [];
    var fem;
    var invReqParl = 0; //Agregar
    var ReqParl = 0;    //Agregar
    var It = 1;
    var sel;

    for(i=0; i < 7; i++) {
            valor[i] = document.getElementsByName("valR")[i].value;
            if (valor[i] < 0 /*Agregar comprobacion solo numeros.*/) {
                alert("El valor de la resistencia " + (i + 1) + " es invalido. Por favor verifique los datos.")
                document.getElementsByName("valR")[i].value = "";
            } else if (valor[i] >= 0) {

            } else {
                valor[i] = 0;
            }
    }
    for(i=0; i<7; i++){
        sel = document.getElementsByName("multiploOhmR")[i];
        switch(sel.options[sel.selectedIndex].value){
            case "mOhm":
                multiplicador[i] = 0.001;
                break;
            case "Ohm":
                multiplicador[i] = 1;
                break;
            case "KOhm":
                multiplicador[i] = 1000;
                break;
            case "MOhm":
                multiplicador[i] = 1000000;
                break;
            default:
                multiplicador[i] = 1;
                break;
        }
    }

    for(i=0 ; i<7; i++){
        resistencias[i] = valor[i] * multiplicador[i];
    }
//David: agrego calculo de rparalelo
    for(i=0; i<7; i++){
        if(resistencias[i]>0){
            invReqParl += 1/resistencias[i];
        }
    }
//David: agrego la inversa.
    if(invReqParl>0)
    ReqParl = 1/invReqParl;

    fem = document.getElementById("valfem1").value;

    if(ReqParl > 0 && invReqParl>0) {
        It = fem / ReqParl;
        document.getElementById("valIt").value = It.toFixed(3);
        document.getElementById("Req").value = ReqParl.toFixed(3); //David: Agrego

        //Agrego calculo de Corrientes:
        for(i=0; i<7; i++){
            if(resistencias[i]>0)
                document.getElementsByName("valI")[i].value = (fem / resistencias[i]).toFixed(3);
            else{
                document.getElementsByName("valI")[i].value = "";
            }
        }
        //Iniciamos con la animación en Canvas
        if(interval)
            clearInterval(interval);

        for (var i = 1; i < 8; i++) {
            xm[i-1] = 0;
            ym[i-1] = 50;
        }
        //Modificamos el llamado de canvasParalelo aplicando un setInterval para la animación:
        interval = setInterval(function() { CircuitoParalelo("canvasParalelo", 30, 50, 10, resistencias); }, 1);
    }else {
        alert("Valor de resistencias invalidos.");
    }
}

/**
 * Esta funcion varia el valor de la fem en circuito serie de a una unidad dependiendo el boton que se clickee.
 * @method Variacion del valor de la fem
 * @param boton {string} id del boton presionado
 * @return No hay retorno de valores
 */

function CambiarVoltaje(boton) {

    var inputFem = document.getElementById("valfem1");
    var num = parseFloat(inputFem.value);

    if(boton == "buttonMas"){
        num += 1;
    }else if(boton == "buttonMenos"){
        num -= 1;
    }
    inputFem.value = num;
    CalcularSerie();
}

/**
 * Esta funcion varia el valor de la fem en circuito paralelo de a una unidad dependiendo el boton que se clickee.
 * @method Variacion del valor de la fem
 * @param boton {string} id del boton presionado
 * @return No hay retorno de valores
 */

function CambiarVoltajeP(boton) {

    var inputFem = document.getElementById("valfem1");
    var num = parseFloat(inputFem.value);

    if(boton == "buttonMas"){
        num += 1;
    }else if(boton == "buttonMenos"){
        num -= 1;
    }
    inputFem.value = num;
    CalcularParalelo();
}

//CANVAS

/**
 * Dibuja una resistencia en un punto especifico dentro de un canvas.
 * @method Grafico de Resistencia horizontal en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @return No hay retorno de valores
 */

function DibujarResistencia(canv, x0, y0, d){
    var canvas = document.getElementById(canv);

    var width = canvas.width;
    var height = canvas.height;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = [], y = [];
        x[0] = x0, y[0] = y0 - 3*d;

        for(i=1;i<8;i++){
            x[i] = x[i-1] + d;
            y[i] = y[i-1] + d;
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x[0],y[3]);
        ctx.lineTo((x[2]+x[1])/2,y[3]); ctx.moveTo((x[2]+x[1])/2,y[3]);

        ctx.lineTo(x[2], y[2]); ctx.moveTo(x[2],y[2]);
        ctx.lineTo(x[3],y[4]); ctx.moveTo(x[3],y[4]);
        ctx.lineTo(x[4],y[2]); ctx.moveTo(x[4],y[2]);
        ctx.lineTo(x[5],y[4]); ctx.moveTo(x[5],y[4]);

        ctx.lineTo((x[6]+x[5])/2,y[3]); ctx.moveTo((x[6]+x[5])/2,y[3]);
        ctx.lineTo(x[7],y[3]);
        ctx.closePath();
        ctx.stroke();
    }
}

/**
 * Dibuja una resistencia en un punto especifico dentro de un canvas.
 * @method Grafico de Resistencia vertical en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @return No hay retorno de valores
 */

function DibujarResistenciaParl(canv, x0, y0, d){
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = [], y = [];
        x[0] = x0 + 4*d, y[0] = y0 + 6*d;

        for(i=1;i<8;i++){
            x[i] = x[i-1] + d;
            y[i] = y[i-1] + d;
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x[3],y[0]);
        ctx.lineTo(x[3],(y[2]+y[1])/2); ctx.moveTo(x[3],(y[2]+y[1])/2);

        ctx.lineTo(x[4], y[2]); ctx.moveTo(x[4],y[2]);
        ctx.lineTo(x[2],y[3]); ctx.moveTo(x[2],y[3]);
        ctx.lineTo(x[4],y[4]); ctx.moveTo(x[4],y[4]);
        ctx.lineTo(x[2],y[5]); ctx.moveTo(x[2],y[5]);

        ctx.lineTo(x[3],(y[6]+y[5])/2); ctx.moveTo(x[3],(y[6]+y[5])/2);
        ctx.lineTo(x[3],y[7]);
        ctx.closePath();
        ctx.stroke();
    }
}

/**
 * Dibuja una fuente de C.C. en un punto especifico dentro de un canvas.
 * @method Grafico de una fem en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @return No hay retorno de valores
 */

function DibujarFem(canv, x0, y0, d) {
    var canvas = document.getElementById(canv);

    var width = canvas.width;
    var height = canvas.height;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //var d = 10;

        var x = [], y = [];
        x[0] = x0 - 3*d, y[0] = y0;

        for(i=1;i<8;i++){
            x[i] = x[i-1] + d;
            y[i] = y[i-1] + d;
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x[3],y[0]);
        ctx.lineTo(x[3],y[3]); ctx.moveTo(x[1],y[3]);

        ctx.lineTo(x[5], y[3]); ctx.moveTo(x[3],y[4]);
        ctx.lineTo(x[3],y[7]);
        ctx.closePath();
        ctx.stroke();

        ctx.fillText("--", x[0], y[5]);
        ctx.fillText("+", x[0], y[3]);

        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(x[2],y[4]);
        ctx.lineTo(x[4],y[4]);
        ctx.closePath();
        ctx.stroke();
    }
}

/**
 * Dibuja una linea en un punto especifico dentro de un canvas.
 * @method Grafico de linea horizontal o vertical en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @param orient {string} valor del a orientacion de la linea
 * @return No hay retorno de valores
 */

function DibujarLinea(canv, x0, y0, d, orient){
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = [], y = [];
        //var orient = "h";

        if(orient == "h"){
            x[0] = x0, y[0] = y0 - 2*d;
        }else if(orient == "v"){
            x[0] = x0 - 3*d, y[0] = y0;
        }
        //var d = 10;

        for(i=1;i<8;i++){
            x[i] = x[i-1] + d;
            y[i] = y[i-1] + d;
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        if(orient == "h") {
            ctx.moveTo(x[0], y[3]);
            ctx.lineTo(x[7], y[3]);
        }else if (orient == "v"){
            ctx.moveTo(x[3], y[0]);
            ctx.lineTo(x[3], y[7]);
        }
        ctx.closePath();
        ctx.stroke();
    }
}

/**
 * Dibuja un texto en un punto especifico dentro de un canvas.
 * @method Grafico de un texto en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @param text {string} texto a dibujar
 * @return No hay retorno de valores
 */

function text(canv, x0, y0, d, text) {
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.font = "15px Arial";
        ctx.fillText(text, x0 + 2.5*d, y0);
    }
}

/**
 * Dibuja un circuito de resistencias en serie en un punto especifico dentro de un canvas.
 * @method Grafico de un circuito de resistencias en serie en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @param resis {array} arreglo con el valor de cada resistencia
 * @return No hay retorno de valores
 */

function CircuitoSerie(canv, x0, y0, d, resis) {
    let canvas = document.getElementById(canv);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
    var x = [], y =[];
    x[0]=x0;
    y[0]=y0
    for(var i=1;i<8;i++){
        x[i] = x[i-1] + (6*d);
        y[i] = y[i-1] + (6*d);
    }

    for(var j=0;j<7;j++){       // Dibujo las resistencias dependiendo si el valor es distinto de cero.
        if(resis[j] != 0){
            DibujarResistencia(canv, x[j], y[0], d);
            text(canv, x[j], y[0] - d*2, d, "R" + (j+1));
            text(canv, x[j], y[0] + d*3, d, "V" + (j+1));
        }else{
            DibujarLinea(canv, x[j], y[0] - d, d, "h");
        }
        DibujarLinea(canv, x[j], y[3], d, "h");
    }

    DibujarLinea(canv, x[0], y[0], d, "v");
    DibujarFem(canv, x[0], y[1], d);
    text(canv, x[0] - 2*d, y[1] + d, d, "fem");
    DibujarLinea(canv, x[0], y[2], d, "v");

    DibujarLinea(canv, x[7] + 1*d, y[0], d, "v");
    DibujarLinea(canv, x[7] + 1*d, y[1], d, "v");
    DibujarLinea(canv, x[7] + 1*d, y[2], d, "v");
	
	//Agregamos ANIMACION de la fecla representando las corrientes:
			if(xs < canvas.width-20 && ys == 50){
				dibujarFlecha(xs, ys, 1, "canvasSerie");
				xs++;
			}else if(ys < canvas.height-60 && xs == canvas.width-20){
				dibujarFlecha(xs, ys, 2, "canvasSerie");
				ys++;
			}else if(xs > 29 && ys == canvas.height-60){
				dibujarFlecha(xs, ys, 3, "canvasSerie");
				xs--;
			}else if(ys > 10 && xs == 29){
				dibujarFlecha(xs, ys, 4, "canvasSerie");
				ys--;
			}
}

/**
 * Dibuja un circuito de resistencias en paralelo en un punto especifico dentro de un canvas.
 * @method Grafico de un circuito de resistencias en paralelo en canvas.
 * @param canv {string} id del canvas a dibujar
 * @param x0 {int} valor en X del punto inicial
 * @param y0 {int} valor en Y del punto inicial
 * @param d {int} tamano de la escala
 * @param resis {array} arreglo con el valor de cada resistencia
 * @return No hay retorno de valores
 */

function CircuitoParalelo(canv, x0, y0, d, resis) {
    let canvas = document.getElementById(canv);
    if (canvas.getContext) {
		
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    var x = [], y = [];
    x[0] = x0;
    y[0] = y0;
    for (var i = 1; i < 8; i++) {
        x[i] = x[i - 1] + (6 * d);
        y[i] = y[i - 1] + (6 * d);
    }
	
    var temp =0;
    for (var j = 7; j > 0; j--) {
	
        if(resis[j-1] != 0){
			
			if(xm[j-1] < x[7-temp]+9 && ym[j-1] == 50){
				dibujarFlecha(xm[j-1], ym[j-1], 1, "canvasParalelo");
				xm[j-1]++;
			}else if(ym[j-1] < canvas.height-60 && xm[j-1] == x[7-temp]+9){
				dibujarFlecha(xm[j-1], ym[j-1], 2, "canvasParalelo");
				ym[j-1]++;
			}else if(xm[j-1] > 29 && ym[j-1] == canvas.height-60){
				dibujarFlecha(xm[j-1], ym[j-1], 3, "canvasParalelo");
				xm[j-1]--;
			}else if(ym[j-1] > 10 && xm[j-1] == 29){
				dibujarFlecha(xm[j-1], ym[j-1], 4, "canvasParalelo");
				ym[j-1]--;
			}

			DibujarLinea(canv, x[7-temp] + 1 * d, y[0], d, "v");
            DibujarLinea(canv, x[7-temp] + 1 * d, y[2], d, "v");
            DibujarResistenciaParl(canv, x[6-temp], y[0], d);
            text(canv, x[6-temp] + d * 6, y[0] + d * 10, d, "R" + (j) );
            temp += 1;
        
        }

		DibujarLinea(canv, x[j-1], y[3], d, "h");
        DibujarLinea(canv, x[j-1], y[0] - d, d, "h");
    }

    DibujarLinea(canv, x[0], y[0], d, "v");
    DibujarFem(canv, x[0], y[1], d);
    text(canv, x[0] - 2 * d, y[1] + d, d, "fem");
    DibujarLinea(canv, x[0], y[2], d, "v");	
	
}

/**
 * Función que redirecciones a las demas paginas del sitio web
 * @method Usamos el Self ref
 * @param Id correspondiente a cada pagina.
 * @return No hay retorno de valores
 */

function Introhtml() {
  self.location.href = 'Intro.html';
}
function CSeriehtml() {
    self.location.href = 'CSerie.html';
}
function CParlhtml() {
    self.location.href = 'CParalelo.html';
}
function Contachtml() {
    self.location.href = 'contacto.html';
}


/**
 * Dibuja una flecha en un punto especifico dentro de un canvas.
 * @method Grafico de una flecha en canvas.
 * @param chanvas {string} id del canvas a dibujar.
 * @param x {int} valor en X del punto inicial
 * @param y {int} valor en Y del punto inicial
 * @param r {int} Representa recorrido de la felcha: r=1 superior, r=2 derecha, r=3 Inferior, r=4 Izquierdo.
 * @return No hay retorno de valores
 */

function dibujarFlecha(x, y, r, chanvas) {
    var colors = ["#000000", "#ffffff", "#ffcc00"];
    var ctx = document.getElementById(chanvas).getContext("2d");

    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";

	if(r == 1){
		ctx.arrow(x, y, x+20, y, [0, 2, -15, 2, -15, 8]);
	}else if(r == 2){
		ctx.arrow(x, y, x, y+20, [0, 2, 5, 2, 5, 8]);
	}else if(r == 3){
		ctx.arrow(x, y, x-20, y, [0, -2, -15, -2, -15, -8]);
	}else if(r == 4){
		ctx.arrow(x, y, x, y-20, [0, 2, -15, 2, -15, 8]);
	}

    ctx.fill();
	ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
}

