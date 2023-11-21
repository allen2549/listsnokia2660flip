document.addEventListener("DOMContentLoaded", function() {
    carregarListas();
});

function carregarListas() {
    carregarListaTarefasLocal();
    carregarListaTarefasBanco();
}

function carregarListaTarefasLocal() {
    var lista = document.getElementById("lista");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var listaTarefas = JSON.parse(xhr.responseText);

            listaTarefas.forEach(function(tarefa) {
                adicionarItemNaLista(tarefa);
            });
        }
    };

    xhr.open("GET", "./interacao_bd.php", true);
    xhr.send();
}

function carregarListaTarefasBanco() {
    var listaBanco = document.getElementById("listaBanco");

    while (listaBanco.firstChild) {
        listaBanco.removeChild(listaBanco.firstChild);
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var listaTarefasBanco = JSON.parse(xhr.responseText);

            listaTarefasBanco.forEach(function(tarefa) {
                adicionarItemNaListaBanco(tarefa);
            });
        }
    };

    xhr.open("GET", "./interacao_bd.php?acao=listarTarefas", true);
    xhr.send();
}

function adicionarItemNaListaBanco(descricao) {
    var listaBanco = document.getElementById("listaBanco");
    var novoItem = document.createElement("li");
    novoItem.appendChild(document.createTextNode(descricao));
    listaBanco.appendChild(novoItem);
}

function adicionarItemNaLista(descricao) {
    var lista = document.getElementById("lista");
    var novoItem = document.createElement("li");

    var concluirButton = document.createElement("button");
    concluirButton.className = "concluir";
    concluirButton.innerHTML = ">";
    concluirButton.onclick = function() {
        concluirItem(descricao);
    };

    var excluirButton = document.createElement("button");
    excluirButton.className = "excluir";
    excluirButton.innerHTML = "X";
    excluirButton.onclick = function() {
        excluirItem(descricao);
    };

    novoItem.appendChild(document.createTextNode(descricao));
    novoItem.appendChild(concluirButton);
    novoItem.appendChild(excluirButton);

    lista.appendChild(novoItem);
}

function adicionarItem() {
    var descricaoInput = document.getElementById("descricao").value;
    if (descricaoInput.trim() !== "") {
        adicionarItemNaLista(descricaoInput);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log("Status da requisição:", xhr.status);
                console.log("Resposta do servidor:", xhr.responseText);

                if (xhr.status == 200) {
                    var resposta = JSON.parse(xhr.responseText);
                    if (resposta.status === "success") {
                        console.log(resposta.mensagem);
                    } else {
                        console.error(resposta.mensagem);
                    }
                } else {
                    console.error("Erro na requisição ao servidor.");
                }
            }
        };

        xhr.open("POST", "./interacao_bd.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("acao=adicionarItem&descricao=" + encodeURIComponent(descricaoInput));

        document.getElementById("descricao").value = "";

        return false;
    }
    return false;
}

function gravarNoBanco() {
    var lista = document.getElementById("lista");
    var itens = lista.getElementsByTagName("li");
    var descricoes = [];

    for (var i = 0; i < itens.length; i++) {
        descricoes.push(itens[i].textContent.trim());
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log("Status da requisição:", xhr.status);
            console.log("Resposta do servidor:", xhr.responseText);

            if (xhr.status == 200) {
                var resposta = JSON.parse(xhr.responseText);
                if (resposta.status === "success") {
                    console.log(resposta.mensagem);
                } else {
                    console.error(resposta.mensagem);
                }
            } else {
                console.error("Erro na requisição ao servidor.");
            }
        }
    };

    xhr.open("POST", "./interacao_bd.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("acao=gravarLista&descricoes=" + encodeURIComponent(JSON.stringify(descricoes)));
}

// Restante do código (concluirItem, excluirItem, limpar) sem alterações
