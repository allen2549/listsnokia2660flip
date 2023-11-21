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
    var descricaoInput = document.getElementById("descricao").value;
    if (descricaoInput.trim() !== "") {
        var lista = document.getElementById("lista");
        var novoItem = document.createElement("li");
        novoItem.appendChild(document.createTextNode(descricaoInput));
        lista.appendChild(novoItem);
        document.getElementById("descricao").value = "";

        // Envia a descrição para o servidor para ser adicionada ao banco de dados
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resposta = JSON.parse(xhr.responseText);
                if (resposta.status === "success") {
                    console.log(resposta.mensagem);
                } else {
                    console.error(resposta.mensagem);
                }
            }
        };

        xhr.open("POST", "./interacao_bd.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("acao=adicionarItem&descricao=" + encodeURIComponent(descricaoInput));

        return false;
    }
    return false;
}

// Função para concluir uma tarefa (código omitido, pois não foi fornecido na conversa)
function concluirItem(id) {
    // Lógica para concluir uma tarefa
}

// Função para excluir uma tarefa (código omitido, pois não foi fornecido na conversa)
function excluirItem(id) {
    // Lógica para excluir uma tarefa
}

// Função para limpar a lista (código omitido, pois não foi fornecido na conversa)
function limpar() {
    // Lógica para limpar a lista
}
