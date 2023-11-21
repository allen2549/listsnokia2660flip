<?php
$host = "isabelle.db.elephantsql.com";
$port = "5432";
$dbname = "hsmmaodv";
$user = "hsmmaodv";
$password = "hfUmqQWcE75C6TnkjlXoWFks2CypUQ_A";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Falha na conexão com o banco de dados");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["acao"]) && $_POST["acao"] == "adicionarItem") {
        $descricao = $_POST["descricao"];
        $query = "INSERT INTO ListaDeTarefas (descricao) VALUES ($1)";
        $result = pg_query_params($conn, $query, array($descricao));

        if ($result) {
            echo json_encode(array("status" => "success", "mensagem" => "Item adicionado com sucesso."));
        } else {
            echo json_encode(array("status" => "error", "mensagem" => "Erro ao adicionar o item."));
        }
    }
}

pg_close($conn);
?>
