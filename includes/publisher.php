<?php

// Look in the db if some grid are in status scheduled and if the date has passed.
// If so, we publish it with the current date.

$sql = "SELECT id, title FROM `arrows_grids` WHERE status='scheduled' AND date < NOW()";
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
while($data = mysql_fetch_assoc($req)){
  $id = $data["id"];

  $sql = "UPDATE `arrows_grids` SET `date` = NOW(), `status` = 'published' WHERE `id` = " .$id;
  $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

}
?>
