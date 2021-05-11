<aside id="sidebar">

<!-- DERNIERES GRILLES REMPLIES -->

<?php
$sql = "SELECT u.login, u.url as userUrl, g.title, g.url as gridUrl, g.level, ug.score, ug.date FROM `arrows_user_grid` ug, `arrows_user` u, `arrows_grids` g WHERE ug.date <> \"0000-00-00 00:00:00\" AND ug.userId = u.id AND ug.gridId = g.id AND ug.date IS NOT NULL ORDER BY ug.date DESC LIMIT 0, 10";
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
?>
<div class="sidebar-block">
<h1>Activit&egrave; r&egrave;cente</h1>
<ul class="side-player-list">

<?php

while($data = mysqli_fetch_assoc($req)){
?>
<li><a href="<?=$data['userUrl'];?>" class="detail-author"><strong><?=htmlentities($data['login'], ENT_QUOTES);?></strong></a> - 
<a href="<?=$data['gridUrl'];?>" class="detail-level-<?=$data['level'];?>"><strong><?=htmlentities($data['title'], ENT_QUOTES);?></strong></a></li>
<?php
}
?>

</ul>
</div>

<!-- PROCHAINES GRILLES -->
<?php

$sql = 'SELECT title, level, rowCount, colCount, date FROM `arrows_grids` WHERE private = "" AND status = "scheduled" ORDER BY date ASC LIMIT 0, 2';
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
$nbScheduledGrids = mysqli_num_rows($req);
if ($nbScheduledGrids > 0){
?>
<div class="sidebar-block">
<h1>Les Prochaines Grilles</h1>
<ul class="sidebar-grid-list">

<?php
while($data = mysqli_fetch_assoc($req)){

  $str_big_grid = "";
  $nbSquares = intval($data["rowCount"]) * intval($data["colCount"]);
  if($nbSquares > 35){
    $str_big_grid = '&nbsp;<span class="big_grid">[GG]</span>';
  }

  if (($timestamp = strtotime($data["date"])) === false) {
      $str_date = $data["date"];
  } else {
      $inMinutes = ceil(($timestamp - time()) / 60);
      if ($inMinutes < 60){
            $str_date = 'Dans ' . $inMinutes . ' minutes';
      }else{
            $inHours = floor($inMinutes / 60);
            if ($inHours < 24){
                  $str_date = 'Dans ' . $inHours . ' heures';
            }else{
                  $inDays = ceil($inHours / 24);
                  $str_date = 'Dans ' . $inDays . ' jours';
            }
      }
  }
?>

<li><span href="#" class="detail-level-<?=$data['level'];?>"><?=htmlentities($data['title'], ENT_QUOTES);?></span><?=$str_big_grid;?>&nbsp;<span style="font-size:10px;color:#BABABA;"><?=$str_date;?></span></li>

<?php } ?>
</ul>
</div>

<?php } ?>

<!-- TOP GRILLES -->
<?php

$sql = 'SELECT title, level, url, rowCount, colCount FROM `arrows_grids` WHERE private = "" AND status = "published" ORDER BY doneCount DESC LIMIT 0, 10';
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

?>
<div class="sidebar-block">
<h1>Grilles les plus jou&eacute;es</h1>
<ul class="sidebar-grid-list">
<?php

while($data = mysqli_fetch_assoc($req)){

$str_big_grid = "";
$nbSquares = intval($data["rowCount"]) * intval($data["colCount"]);
if($nbSquares > 35){
  $str_big_grid = '&nbsp;<span class="big_grid">[Grande Grille]</span>';
}
?>
<li><a href="<?=$data['url'];?>" class="detail-level-<?=$data['level'];?>"><?=htmlentities($data['title'], ENT_QUOTES);?><?=$str_big_grid;?></a></li>
<?php } ?>
</ul>
</div>

<!-- TOP CRUCIVERBISTES -->
<?php

$sql = 'SELECT login, url, doneScore FROM `arrows_user` WHERE isAdmin = 0 ORDER BY doneScore DESC LIMIT 0, 10';
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

?>

<div class="sidebar-block">
<h1>Top Cruciverbistes</h1>
<ul class="side-player-list">
<?php

while($data = mysqli_fetch_assoc($req)){
?>
<li><a href="<?=$data['url'];?>" class="detail-author"><strong><?=htmlentities($data['login'], ENT_QUOTES);?></strong></a>: <?=$data['doneScore'];?> points</li>
<?php } ?>
</ul>
<a href="http://bonsmots.fr/joueurs/" style="float:right;font-size:10px;color:#AEAEAE;">Voir tous les joueurs</a>
</div>


<!-- TOP VERBICRUCISTES -->
<?php

//$sql = 'SELECT COUNT(G.id) AS doneCount, U.login, U.url FROM `arrows_user` U, `arrows_grids` G WHERE G.author = U.id LIMIT 0 , 10';
$sql = "SELECT COUNT(G.author) as authorCount, U.login, U.url FROM arrows_grids G, arrows_user U WHERE G.author=U.id GROUP BY G.author ORDER BY authorCount DESC LIMIT 0,10";
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

?>
<div class="sidebar-block">
<h1>Top Verbicrucistes</h1>
<ul class="side-player-list">
<?php

while($data = mysqli_fetch_assoc($req)){
?>
<li><a href="<?=$data['url'];?>" class="detail-author"><strong><?=htmlentities($data['login'], ENT_QUOTES);?></strong></a>: <?=$data['authorCount'];?> grilles cr&eacute;&eacute;es</li>
<?php } ?>
</ul>
</div>

<!-- DERNIERS INSCRITS -->
<?php

//$sql = "SELECT * FROM `arrows_user` WHERE date <> \"0000-00-00 00:00:00\" ORDER BY date DESC LIMIT 0, 10";
$sql = "SELECT login, url FROM `arrows_user` WHERE 1 ORDER BY id DESC LIMIT 0, 10";
$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

?>

<div class="sidebar-block">
<h1>Derniers inscrits</h1>
<ul class="side-player-list">
<?php

while($data = mysqli_fetch_assoc($req)){
?>
<li><a href="<?=$data['url'];?>" class="detail-author"><strong><?=htmlentities($data['login'], ENT_QUOTES);?></strong></a></li>
<?php } ?>
</ul>
</div>
<!-- SOCIAL SIDEBAR BLOCK -->
<div class="sidebar-block" style="margin-bottom: 100px">
<h1>Quand on aime...</h1>
<div style="margin-left: 10px;">
<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fbonsmots.fr&amp;layout=standard&amp;show_faces=false&amp;width=250&amp;action=like&amp;font=trebuchet+ms&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:250px; height:35px;" allowTransparency="true"></iframe>

<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-via="Alconis">Tweet</a>
<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
</div></div>

</aside><!-- Sidebar -->