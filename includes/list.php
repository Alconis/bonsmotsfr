<?php

$sql = 'SELECT G.title, G.level, G.rowCount, G.colCount, G.date, G.url AS gridUrl, G.doneCount, U.id, U.login, U.url AS authorUrl FROM `arrows_grids` G, `arrows_user` U WHERE G.author = U.id AND G.private = "" AND G.status = "published" ORDER BY G.date DESC';
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

$nb_results = mysqli_num_rows($req);
?>

<div id="main-content">

<div id="welcome-message">
	<p>Sur BonsMots.fr, les f&eacute;rus de mots fl&eacute;ch&eacute;s vont pouvoir s'adonner &agrave; coeur joie &agrave; leur passe-temps favori en remplissant des grilles de tous niveaux directement sur le site. En cr&eacute;ant un compte sur BonsMots.fr, vous pourrez enregistrer les grilles que vous avez d&eacute;j&agrave;  remplies mais vous aurez aussi acc&egrave;s &agrave;  la partie de cr&eacute;ation de grilles de mots fl&eacute;ch&eacute;s !</p>
	<span class="close-welcome-message"><a id="welcome-message-hide" href="#">Cacher ce message</a></span>
</div>

<header><h1>Derni&egrave;res Grilles Publi&eacute;es</h1></header>

<div class="grid-list-header">
<span class="left"><?=$nb_results;?> Grilles</span>Filter par : <a href="#" class="sort-criteria">Taille (Tous)</a> | <a href="#" class="sort-criteria">Difficulté (Tous)</a>
</div>
<div id="grid-list" class="grid-items">
<?php

while($data = mysqli_fetch_assoc($req)){
//Squares number
$str_big_grid = "";
$str_squares = intval($data["rowCount"]) * intval($data["colCount"]);

//"Grande grille"
if ($str_squares > 35){
  $str_big_grid = '&nbsp;&nbsp;&nbsp;<span class="big_grid">[Grande Grille]</span>';
}

//level --> string
if ($data["level"] == "1"){
  $str_level = "Facile";
}else if ($data["level"] == "2"){
  $str_level = "Moyen";
}else{
  $str_level = "Difficile";
}

//format date
if (($timestamp = strtotime($data["date"])) === false) {
    $str_date = $data["date"];
} else {
    $str_date = date('d/m/Y', $timestamp);
}

// Nouveau ?
$str_new = "";
$isNew = (time() - $timestamp) < (24*60*60);
if ($isNew){
    $str_new = '&nbsp;&nbsp;&nbsp;<span class="new_grid">Nouveau !</span>';
}

?>

<div class="grid-item">
<div class="grid-item-thumb"><a href="<?=$data['gridUrl'];?>"><img src="http://bonsmots.fr/img/grid_icon_big_lvl<?=$data['level'];?>.png"></a></div>
<div class="grid-item-title">
<h3><a href="<?=$data['gridUrl'];?>"><?=htmlentities($data['title'], ENT_QUOTES);?></a><?=$str_big_grid;?><?=$str_new;?></h3>
<ul class="grid-item-details">
<li><a href="<?=$data['authorUrl'];?>" class="detail-author"><?=$data['login'];?></a></li>
<li><a href="#" class="detail-date"><?=$str_date;?></a></li>
<li><a href="#" class="detail-size"><?=$str_squares;?> cases</a></li>
<!--<li><a href="#" class="detail-level-<?=$data['level'];?>"><?=$str_level;?></a></li>-->
<li><a href="#" class="detail-count-<?=$data['doneCount'];?>">Jou&eacute;e <?=$data['doneCount'];?> fois</a></li>
</ul>
</div>
</div>

<?php
}
?>

</div>
</div><!-- Main Content -->