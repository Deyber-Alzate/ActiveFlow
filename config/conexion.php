<?php
$dsn = 'mysql:host=localhost;dbname=trabajo web';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}
?>
