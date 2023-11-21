document.addEventListener("DOMContentLoaded", function() {
    carregarListaTarefas();
});

function carregarListaTarefas() {
    var lista = document.getElementById("lista");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var listaTarefas = JSON.parse(xhr.responseText);

            listaTarefas.forEach(function(tarefa) {
                var novoItem = document.createElement("li");
                novoItem.appendChild(document.createTextNode(tarefa));
                lista.appendChild(novoItem);
            });
        }
    };

    xhr.open("GET", "./interacao_bd.php", true);
    xhr.send();
}

function adicionarItem() {
    // Função adicionarItem aqui
    return false;
}

function concluirItem(id) {
    // Função concluirItem aqui
}

function excluirItem(id) {
    // Função excluirItem aqui
}

function limpar() {
    // Função limpar aqui
}
