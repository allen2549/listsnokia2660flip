var contador = 1;

function adicionarItem() {
  var descricaoInput = document.getElementById("descricao").value;
  if (descricaoInput.trim() !== "") {
    var lista = document.getElementById("lista");
    var novoItem = document.createElement("li");
    novoItem.id = "item" + contador;

    var concluirButton = document.createElement("button");
    concluirButton.className = "concluir";
    concluirButton.innerHTML = ">";
    concluirButton.onclick = function() {
      concluirItem(novoItem.id);
    };

    var excluirButton = document.createElement("button");
    excluirButton.className = "excluir";
    excluirButton.innerHTML = "X";
    excluirButton.onclick = function() {
      excluirItem(novoItem.id);
    };

    novoItem.appendChild(document.createTextNode(descricaoInput));
    novoItem.appendChild(concluirButton);
    novoItem.appendChild(excluirButton);
    lista.appendChild(novoItem);
    document.getElementById("descricao").value = "";
    contador++;

    // Aqui você pode adicionar código para enviar os dados para o servidor (opcional).

    return false;
  }
  return false;
}

function concluirItem(id) {
  var item = document.getElementById(id);
  var marcado = item.style.textDecoration === "line-through";

  if (marcado) {
    item.style.textDecoration = "none";
    item.style.color = "white";
  } else {
    item.style.textDecoration = "line-through";
    item.style.color = "green";
  }
}

function excluirItem(id) {
  var item = document.getElementById(id);
  item.parentNode.removeChild(item);
}

function limpar() {
  var lista = document.getElementById("lista");
  var ultimoItem = lista.lastElementChild;

  if (ultimoItem) {
    lista.removeChild(ultimoItem);
  }
}
