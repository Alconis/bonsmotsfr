<div id="main-content">

<?php 

$userId = $_GET["id"];

if (!$userId && $the_user){
	$userId = $the_user->id;
}

if ($the_user && $the_user->id == $userId){
	$isLoggedUserProfile = true;
}else{
	$isLoggedUserProfile = false;
}

$user = new User();
$user->id = $userId;

$sql = 'SELECT * FROM arrows_user WHERE id=' . $user->id;
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
$data = mysql_fetch_assoc($req);
if ($data){
	$user->login = $data['login'];
	$user->mail = $data['mail'];
	$user->url = $data['url'];
	$user->score = $data['doneScore'];
}
?>

<? if($isLoggedUserProfile){ ?>
<header><h1>Votre fiche sur BonsMots.fr</h1></header>
<? }else{ ?> 
<header><h1>La fiche de <?=$user->login;?> sur BonsMots.fr</h1></header>
<? } ?>

<h2 class="score">Score: <?=$user->score;?> points !</h2>


<p>Sur <strong>BonsMots.fr</strong>, plus vous remplissez de grilles plus vous amassez de points.
Une grille de niveau Facile rapporte 1 point, 2 points pour une grille de niveau Moyen et 3 points pour une Difficile.
De plus, une Grande Grille termin&eacute;e rapporte 1 point suppl&eacute;mentaire. Si vous commettez des erreurs,
votre score sera amput&eacute; d'autant d'erreurs commises.</p>

<!-- PLAYED GRID LIST -->
<?php
$sql = 'SELECT G.title, G.level, G.rowCount, G.colCount, G.url, UG.score FROM `arrows_user_grid` UG, `arrows_grids` G WHERE UG.gridId = G.id AND UG.userId = ' . $user->id . ' ORDER BY G.date DESC';
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
$nb_results = mysql_num_rows($req);
?>

<table class="user-grids">
  <caption><?=$nb_results;?> Grilles Remplies</CAPTION>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Difficult&eacute;</th>
      <th>Taille</th>
      <th>Points Gagn&eacute;s</th>
    </tr>
  </thead>
  <tbody>
<?php

while($data = mysql_fetch_assoc($req)){

$str_squares = intval($data["rowCount"]) * intval($data["colCount"]);

if ($data["level"] == "1"){
  $str_level = "Facile";
}else if ($data["level"] == "2"){
  $str_level = "Moyen";
}else{
  $str_level = "Difficile";
}
?>
  <tr>
    <td><a href="<?=$data["url"];?>"><?=htmlentities($data["title"]);?></a></td>
    <td><?=$str_level;?></td>
    <td><?=$str_squares;?> cases</td>
    <td><?=$data["score"];?> points gagn&eacute;s</td>
  </tr>

<? } ?>
  </tbody>
</table>

<!-- NON PLAYED GRID LIST -->
<?php
$sql = 'SELECT title, level, rowCount, colCount, url FROM `arrows_grids` WHERE private = "" AND status = "published" AND id NOT IN (SELECT gridId FROM `arrows_user_grid` WHERE userId = ' . $user->id . ')';
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
$nb_results = mysql_num_rows($req);
?>

<table class="user-grids">
  <caption><?=$nb_results;?> Grilles Non Remplies</CAPTION>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Difficult&eacute;</th>
      <th>Taille</th>
    </tr>
  </thead>
  <tbody>
<?php

while($data = mysql_fetch_assoc($req)){

$str_squares = intval($data["rowCount"]) * intval($data["colCount"]);

if ($data["level"] == "1"){
  $str_level = "Facile";
}else if ($data["level"] == "2"){
  $str_level = "Moyen";
}else{
  $str_level = "Difficile";
}
?>
  <tr>
    <td><a href="<?=$data["url"];?>"><?=htmlentities($data["title"]);?></a></td>
    <td><?=$str_level;?></td>
    <td><?=$str_squares;?> cases</td>
  </tr>

<? } ?>
  </tbody>
</table>

</div><!-- Main Content -->