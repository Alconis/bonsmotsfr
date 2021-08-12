<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <title>BonsMots.fr - Mots Fl&eacute;ch&eacute;s et Mots Crois&eacute;s en ligne</title>
  <link rel="alternate" type="application/rss+xml" title="RSS 2.0 - Les Derni�res Grilles Publi�s" href="https://feeds.feedburner.com/Bonsmotsfr" />

  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link rel="shortcut icon" href="https://bonsmots.fr/favicon.ico">
  <link rel="apple-touch-icon" href="https://bonsmots.fr/apple-touch-icon.png">

  <link rel="stylesheet" href="https://bonsmots.fr/css/style.css?v=1">
  <link rel="stylesheet" media="handheld" href="https://bonsmots.fr/css/handheld.css?v=1">
  <link rel="stylesheet" href="https://bonsmots.fr/css/arrows.css">

  <script src="https://bonsmots.fr/js/modernizr-1.5.min.js"></script>


  <?php if($is_grid){ ?>
        <link rel="manifest" href="/includes/react-player/manifest.json"/>
        <link rel="stylesheet" href="/includes/react-player/styles.css"/>
        <link href="/includes/react-player/static/css/main.bc3b2b68.chunk.css" rel="stylesheet">
  <?php } ?>
</head>

<body>
<div id="global">
<header id="page-header">

<?php if($the_user){ ?>
<nav id="top-navigation">
<a href="https://bonsmots.fr" <?php echo $is_home?'class="active"':'' ?>>Accueil</a>
<a href="<?=$the_user->url;?>" <?php echo $is_user?'class="active"':'' ?>>Chez <?=htmlentities($the_user->login);?></a>
<a href="https://bonsmots.fr/dico/" <?php echo $is_dico?'class="active"':'' ?>>Le Bon Dico</a>

<?php if($the_user->id == 1){ ?>
<a href="https://bonsmots.fr/editeur/" <?php echo $is_editeur?'class="active"':'' ?>>Editeur de grille</a>
<? } ?>
<a href="https://bonsmots.fr/?deconnexion">Me d&eacute;connecter</a>
</nav>
<?php }else{ ?>
<div id="top-login-panel">
    <ul class="loggedout-navigation">
        <li><a href="#" id="modal-create-account" class="auth-register">S'inscrire !</a></li>
        <li><a href="#" id="modal-login" class="auth-login">M'identifier</a></li>
        <li><a href="https://bonsmots.fr/dico/" class="auth-login">Le Bon Dico</a></li>
    </ul>
</div>
<?php } ?>
<h1 id="header-title"><a href="https://bonsmots.fr">BonsMots.fr</a></h1>


</header><!-- Page Header -->

<section id="center">