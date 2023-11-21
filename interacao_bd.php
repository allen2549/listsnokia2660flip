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
        $query = "INSERT INTO listadetarefas (descricao) VALUES ($1)";
        $result = pg_query_params($conn, $query, array($descricao));

        if ($result) {
            echo json_encode(array("status" => "success", "mensagem" => "Item adicionado com sucesso."));
        } else {
            echo json_encode(array("status" => "error", "mensagem" => "Erro ao adicionar o item."));
        }
    }
}

// Consulta para obter todas as tarefas da tabela "listadetarefas"
$query = "SELECT * FROM listadetarefas";
$result = pg_query($conn, $query);

if (!$result) {
    die("Erro na consulta ao banco de dados");
}

// Monta a lista de tarefas em formato JSON para ser lida pelo JavaScript
$listaTarefas = array();
while ($row = pg_fetch_assoc($result)) {
    $listaTarefas[] = $row['descricao'];
}

echo json_encode($listaTarefas);

pg_close($conn);
?>
