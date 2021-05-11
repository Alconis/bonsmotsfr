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


$sql = 'SELECT * FROM arrows_user WHERE isAdmin = 0 ORDER BY doneScore DESC';
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
$nb_results = mysqli_num_rows($req);
?>
<header><h1>Les joueurs de BonsMots.fr</h1></header>

<p>Sur <strong>BonsMots.fr</strong>, plus vous remplissez de grilles plus vous amassez de points.
Une grille de niveau Facile rapporte 1 point, 2 points pour une grille de niveau Moyen et 3 points pour une Difficile.
De plus, une Grande Grille termin&eacute;e rapporte 1 point suppl&eacute;mentaire. Si vous commettez des erreurs,
votre score sera amput&eacute; d'autant d'erreurs commises.</p>

<table class="users-grid">
  <caption><?=$nb_results;?> Joueurs</CAPTION>
  <thead>
    <tr>
      <th>#</th>
      <th>Nom</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
<?php
$i=1;
while($data = mysqli_fetch_assoc($req)){

?>
	<? if($data["id"] == $userId){ ?>
	<tr style="background-color:#EEEEEE;">
	<? }else{ ?> 
	<tr>
	<? } ?>
		<td style="color:#8E8E8E;font-weight:bold;"><?=$i++;?></td>
		<td><a href="<?=$data["url"];?>"><?=htmlentities($data["login"]);?></a></td>
		<td><?=$data["doneScore"];?> points</td>
	</tr>
<? } ?>
  </tbody>
</table>

</div><!-- Main Content -->