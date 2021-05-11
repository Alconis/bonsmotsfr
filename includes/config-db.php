<?php

define('DB_USER', 'alconisbirds2');
define('DB_PASSWORD', 'EjZuMn5TuD69');
define('DB_HOST', 'mysql51-131.perso');
$db = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysql_select_db('alconisbirds2',$db);

?>