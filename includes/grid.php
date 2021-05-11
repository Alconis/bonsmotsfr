<?php if(!$the_grid){
    include("list.php");
}else{
?>

<div id="main-content" class="<?=$the_grid->is_big()?'big-grid':'small-grid';?>">

<header><h1>Grille <?=htmlentities($the_grid->title, ENT_QUOTES);?> (Niveau <?=$the_grid->level;?>) par <?=htmlentities($the_grid->author, ENT_QUOTES);?></h1></header>

<?php include("flex-player/player.php"); ?>


</div><!-- Main Content -->
<?php } ?>