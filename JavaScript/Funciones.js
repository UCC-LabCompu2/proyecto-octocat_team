

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

    for(i=1; i < 8; i++) {
        valor[i] = document.getElementsByName("valR")[i-1].value;
        if(valor[i] < 0 /*Agregar comprobacion solo numeros.*/){
            alert("El valor de la resistencia " + i + " es invalido. Por favor verifique los datos.")
        }else{

        }
    }
    for(i=1; i<8; i++){
        sel = document.getElementsByName("multiploOhmR")[i-1];
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

    for(i=1 ; i<8; i++){
        resistencias[i] = valor[i] * multiplicador[i];
    }

    for(i=1; i<8; i++){
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

    for(i=1; i<8; i++){
        document.getElementsByName("valV")[i-1].value = (It * resistencias[i]).toFixed(3);
    }

    //DibujarResistencia("canvasSerie", 20, 20, 10);
    //DibujarFem("canvasSerie", 0, 0, 10);
    //DibujarLinea("canvasSerie", 0, 0, 10);
    //cuadricula("canvasSerie");

    var x0=20, y0=20, d=10;

    for(i=1; i<8; i++){
        if(resistencias[i] =! 0){
            x4 = x0 + ((i-1)  * d);
            DibujarResistencia("canvasSerie", x4, y0, d);
            alert(""+x4);
        }
    }

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

        ctx.clearRect(0,0,width,height);

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
        ctx.lineTo(x[3],y[3]); ctx.moveTo(x[1],y[4]);

        ctx.lineTo(x[5], y[4]); ctx.moveTo(x[3],y[4]);
        ctx.lineTo(x[3],y[7]);
        ctx.closePath();
        ctx.stroke();

        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(x[2],y[3]);
        ctx.lineTo(x[4],y[3]);
        ctx.closePath();
        ctx.stroke();
    }


}

function DibujarLinea(canv, x0, y0, d){
    var canvas = document.getElementById(canv);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var x = [], y = [];
        var orient = "h";

        if(orient == "h"){
            x[0] = x0, y[0] = y0 - 3*d;
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

