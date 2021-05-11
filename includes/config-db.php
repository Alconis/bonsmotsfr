<?php

define('DB_USER', 'alconisbirds2');
define('DB_PASSWORD', 'EjZuMn5TuD69');
define('DB_HOST', 'alconisbirds2.mysql.db');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (!mysqli_select_db($conn, 'alconisbirds2')) {
    die("Unable to select database alconisbirds2");
}

?>