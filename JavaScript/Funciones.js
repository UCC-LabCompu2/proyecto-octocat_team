

/**
 * Esta funcion calcula la corriente total y el valor de cada diferencia de potencial en las resistencias.
 * @method Calculo de las resistencias ingresadas
 * @return No hay retorno de valores
 */

function Calcular() {

    alert("Calculando")

    var valor = [];
    var multiplicador = [];
    var resistencias = [];
    var fem;
    var Req = 0;
    var It = 1;
    var sel;

    for(i=1; i < 8; i++) {
        valor[i] = document.getElementsByName("valR")[i-1].value;
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
    alert(fem);

    if(Req > 0) {
        It = fem / Req;
    }else {
        alert("Valor de resistencias invalidos.")
    }

    document.getElementById("valIt").value = It;
    document.getElementById("Req").value = Req;

    for(i=1; i<8; i++){
        document.getElementsByName("valV")[i-1].value = It * resistencias[i];
    }


}