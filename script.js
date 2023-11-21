<script>
  function adicionarItem() {
    var valorInput = document.getElementById("valor").value;
    if (valorInput.trim() !== "") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "interacao_bd.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var resposta = JSON.parse(xhr.responseText);
          if (resposta.status === "success") {
            alert(resposta.mensagem);
            // Recarrega a página ou atualiza a lista de tarefas de alguma forma
          } else {
            alert(resposta.mensagem);
          }
        }
      };

      xhr.send("acao=adicionarItem&descricao=" + encodeURIComponent(valorInput));
    }

    return false;
  }
</script>
