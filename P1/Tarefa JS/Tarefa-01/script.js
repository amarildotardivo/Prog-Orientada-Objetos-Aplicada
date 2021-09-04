
function inserirDado(){
    //pegando o valor do input e colocando na variavel dados
    let dados = document.getElementById('dados').value;
    
    //verificando se o usuário clicou no botão sem escrever nada
    //o trim remove os espaços para verificar se o usuário apenas digitou espaços
    if(!dados.trim()){
        document.getElementById('dados').value = null;
        alert("É necessário informar um dado para adicionar!");
        return 0;
    }
    //insere o html da lista na variavel lista
    let lista = document.getElementById('lista').innerHTML;
    
    //concatena o html da página com a injeção do dado e botão para excluir
    lista += "<li class='item'>" + dados + "<button class='btnExcluir'>Excluir</button>" + "</li>";
    
    //injeta na página html a lista concatenada e atualizada
    document.getElementById('lista').innerHTML = lista;

    //seta null no input para ficar limpo para uma nova adição de tarefa
    document.getElementById('dados').value = null;
}

var lista = document.getElementById('lista');

//remove todo o li da lista ao clicar no botão excluir
lista.addEventListener('click', function(e){
    if(e.target && e.target.nodeName == "BUTTON") {

        e.target.parentNode.remove();
    }
});