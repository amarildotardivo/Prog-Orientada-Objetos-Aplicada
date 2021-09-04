
//-----Conversor de Centímetros em Polegadas
function convertCmPol(){
    let valor = document.getElementById("cm").value
   
    let cm = valor * 0.4

    document.getElementById("convCmPol").innerHTML = cm+"pol"
}
//Chamando a função ao clicar no botão converter Centimetros em Polegadas
var btnConv = document.getElementById("converteCm")
btnConv.addEventListener('click', convertCmPol)


//-----Conversor de Polegadas em Centímetros
function convertPolCm(){
    let valor = document.getElementById("pol").value
   
    let pol = valor * 2.54

    document.getElementById("convPolCm").innerHTML = pol+"cm"
}
//Chamando a função ao clicar no botão converter Polegadas em Centimetros
var btnConv = document.getElementById("convertePol")
btnConv.addEventListener('click', convertPolCm)