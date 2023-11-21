<?php
// Dados de conexão com o banco de dados
$host = "isabelle.db.elephantsql.com";
$port = 5432;  // Porta padrão do PostgreSQL
$usuario = "hsmmaodv";
$senha = "hfUmqQWcE75C6TnkjlXoWFks2CypUQ_A";
$banco = "hsmmaodv";

// Conectar ao banco de dados
$conexao = pg_connect("host=$host port=$port dbname=$banco user=$usuario password=$senha");

// Verificar se a conexão foi bem-sucedida
if (!$conexao) {
    die("Falha na conexão com o banco de dados");
}

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obter dados do formulário
    $tarefa = $_POST['tarefa'];

    // Inserir tarefa no banco de dados
    $query = "INSERT INTO lista_tarefas (descricao) VALUES ('$tarefa')";
    $resultado = pg_query($conexao, $query);

    // Verificar se a inserção foi bem-sucedida
    if ($resultado) {
        echo "Tarefa adicionada com sucesso!";
    } else {
        echo "Erro ao adicionar tarefa.";
    }
}

// Selecionar tarefas existentes no banco de dados
$querySelect = "SELECT descricao, concluido FROM lista_tarefas";
$resultadoSelect = pg_query($conexao, $querySelect);

// Criar array para armazenar as tarefas
$tarefas = array();
while ($linha = pg_fetch_assoc($resultadoSelect)) {
    $tarefas[] = $linha;
}

// Fechar a conexão com o banco de dados
pg_close($conexao);
?>
