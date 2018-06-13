

/**
 * Esta funcion calcula la corriente total y el valor de cada diferencia de potencial en las resistencias.
 * @method Calculo de las resistencias ingresadas
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
            alert("El valor de la resistencia " + i + " es invalido. Por favor verifique los datos.")
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
    }else {
        alert("Valor de resistencias invalidos.")
    }

    document.getElementById("valIt").value = It.toFixed(3);
    document.getElementById("Req").value = Req.toFixed(3);

    for(i=0; i<7; i++){
        document.getElementsByName("valV")[i].value = (It * resistencias[i]).toFixed(3);
    }

    //DibujarResistencia("canvasSerie", 20, 20, 10);
    //DibujarFem("canvasSerie", 0, 0, 10);
    //DibujarLinea("canvasSerie", 0, 0, 10);
    //cuadricula("canvasSerie");

    var x0=20, y0=20, d=10;

    for(i=0; i<7; i++){
        if(valor[i] =! 0){
            var x4 = x0 + (i  * d);
            //DibujarResistencia("canvasSerie", x4, y0, d);
            //alert(""+x4);
            //alert(valor);
        }
        else {
            DibujarLinea("canvasSerie", x0 + (i) * d);
            alert("HOLA")
        }
    }

    CircuitoSerie("canvasSerie", 30, 50, 10, resistencias);

    //drawArrowhead(60,90,Math.PI,20,20);
    DibujarFlecha("canvasSerie", 0,0,0,0);


}

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

function DibujarResistencia(canv, x0, y0, d){
    var canvas = document.getElementById(canv);


    var width = canvas.width;
    var height = canvas.height;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //ctx.scale(0.5,0.5);
        //ctx.clearRect(0,0,width,height);

        //var d = 10;

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


        /*ctx.moveTo(x0,y3);
        ctx.lineTo(x8,y3); ctx.moveTo(x8,y3);

        ctx.lineTo(x2, y1); ctx.moveTo(x2,y1);
        ctx.lineTo(x3,y5); ctx.moveTo(x3,y5);
        ctx.lineTo(x4,y1); ctx.moveTo(x4,y1);
        ctx.lineTo(x5,y5); ctx.moveTo(x5,y5);

        ctx.lineTo(x9,y3); ctx.moveTo(x9,y3);
        ctx.lineTo(x7,y3);*/
    }
}

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

function cuadricula(canv) {
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var d = 10;
        var x = [], y = [];
        x[0] = 50, y[0] = 100;

        for(i=1;i<8;i++){
            x[i] = x[i-1] + d;
            y[i] = y[i-1] + d;
        }

        ctx.lineWidth = 0.5;
        ctx.beginPath();

        for(i=0; i<8;i++){
            ctx.moveTo(x[i], y[0]);
            ctx.lineTo(x[i], y[7]);
        }
        for(i=0; i<8; i++){
            ctx.moveTo(x[0], y[i]);
            ctx.lineTo(x[7], y[i]);
        }
        ctx.closePath();
        ctx.stroke();

    }
}

function text(canv, x0, y0, d, text) {
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.font = "15px Arial";
        ctx.fillText(text, x0 + 2.5*d, y0);

    }
}

function CircuitoSerie(canv, x0, y0, d, resis) {

    var x = [], y =[];
    x[0]=x0;
    y[0]=y0
    for(var i=1;i<8;i++){
        x[i] = x[i-1] + (6*d);
        y[i] = y[i-1] + (6*d);
    }
    for(var t=0;t<7;t++){
        //DibujarResistencia(canv,x[i],y0,d);
    }

    for(var j=0;j<7;j++){
        DibujarResistencia(canv, x[j], y[0], d);
        text(canv, x[j], y[0] - d*2, d, "R" + (j+1));
        text(canv, x[j], y[0] + d*3, d, "V" + (j+1));
        DibujarLinea(canv, x[j], y[3], d, "h");
    }


    DibujarLinea(canv, x[0], y[0], d, "v");
    DibujarFem(canv, x[0], y[1], d);
    text(canv, x[0] - 2*d, y[1] + d, d, "fem");
    DibujarLinea(canv, x[0], y[2], d, "v");

    DibujarLinea(canv, x[7] + 1*d, y[0], d, "v");
    DibujarLinea(canv, x[7] + 1*d, y[1], d, "v");
    DibujarLinea(canv, x[7] + 1*d, y[2], d, "v");




}

function DibujarFlecha(canv, x0, y0, d, ang){
    var canvas = document.getElementById(canv);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //ctx.rect(70,90,20,20);

        ctx.moveTo(70,130);
        //                 vertice/extremo
        ctx.quadraticCurveTo(70,90,110,90);
        ctx.stroke();
        drawArrowhead(110,90,Math.PI,15,10);

    }


}

function drawArrowhead(locx, locy, angle, sizex, sizey) {

    var canvas = document.getElementById("canvasSerie");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');


        var hx = sizex / 2;
        var hy = sizey / 2;

        ctx.translate((locx), (locy));
        ctx.rotate(angle);
        ctx.translate(-hx, -hy);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1 * sizey);
        ctx.lineTo(1 * sizex, 1 * hy);
        ctx.closePath();
        ctx.fill();

        ctx.translate(hx, hy);
        ctx.rotate(-angle);
        ctx.translate(-locx, -locy);
    }
}

