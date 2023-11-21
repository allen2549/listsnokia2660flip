<?php
$acao = $_REQUEST["acao"];

// Configurações do banco de dados
$servername = "isabelle.db.elephantsql.com";
$database = "hsmmaodv";
$username = "hsmmaodv";
$password = "hfUmqQWcE75C6TnkjlXoWFks2CypUQ_A";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $database);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Lógica para diferentes ações
if ($acao === "adicionarItem") {
    $descricao = $_POST["descricao"];

    $stmt = $conn->prepare("INSERT INTO ListaDeTarefas (descricao) VALUES (?)");
    $stmt->bind_param("s", $descricao);
    $stmt->execute();
    $stmt->close();

    $resposta = ["status" => "success", "mensagem" => "Item adicionado com sucesso."];
    echo json_encode($resposta);
} elseif ($acao === "concluirItem") {
    $id = $_POST["id"];

    $stmt = $conn->prepare("UPDATE ListaDeTarefas SET concluido = 1 - concluido WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $resposta = ["status" => "success", "mensagem" => "Item concluído/desconcluído com sucesso."];
    echo json_encode($resposta);
} elseif ($acao === "excluirItem") {
    $id = $_POST["id"];

    $stmt = $conn->prepare("DELETE FROM ListaDeTarefas WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $resposta = ["status" => "success", "mensagem" => "Item excluído com sucesso."];
    echo json_encode($resposta);
} elseif ($acao === "limparLista") {
    $stmt = $conn->prepare("DELETE FROM ListaDeTarefas");
    $stmt->execute();
    $stmt->close();

    $resposta = ["status" => "success", "mensagem" => "Lista limpa com sucesso."];
    echo json_encode($resposta);
} elseif ($acao === "listarTarefas") {
    $result = $conn->query("SELECT descricao FROM ListaDeTarefas");

    $listaTarefas = [];
    while ($row = $result->fetch_assoc()) {
        $listaTarefas[] = $row["descricao"];
    }

    echo json_encode($listaTarefas);
} elseif ($acao === "gravarLista") {
    $descricoes = json_decode($_POST["descricoes"]);

    foreach ($descricoes as $descricao) {
        $stmt = $conn->prepare("INSERT INTO ListaDeTarefas (descricao) VALUES (?)");
        $stmt->bind_param("s", $descricao);
        $stmt->execute();
        $stmt->close();
    }

    $resposta = ["status" => "success", "mensagem" => "Lista gravada com sucesso no banco."];
    echo json_encode($resposta);
}

// Fecha a conexão
$conn->close();
?>
