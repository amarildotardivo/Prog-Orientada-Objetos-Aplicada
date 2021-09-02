
function inserirDado(){
    
    let dados = document.getElementById('dados').value;
    
    
    if(!dados.trim()){
        document.getElementById('dados').value = null;
        alert("É necessário informar um dado para adicionar!");
        return 0;
    }
    
    let lista = document.getElementById('lista').innerHTML;
    
    lista += "<li class='item'>" + dados + "<button class='btnExcluir'>Excluir</button>" + "</li>";
    
    document.getElementById('lista').innerHTML = lista;
    document.getElementById('dados').value = null;
}

var lista = document.getElementById('lista');

lista.addEventListener('click', function(e){
    if(e.target && e.target.nodeName == "BUTTON") {

        e.target.parentNode.remove();
    }
});