<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <!-- www.phpied.com/conditional-comments-block-downloads/ -->
  <!--[if IE]><![endif]-->

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame 
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>BonsMots.fr - Mots Fl&eacute;ch&eacute;s et Mots Crois&eacute;s en ligne</title>
  <link rel="alternate" type="application/rss+xml" title="RSS 2.0 - Les Derni�res Grilles Publi�s" href="https://feeds.feedburner.com/Bonsmotsfr" />

  <meta name="description" content="">
  <meta name="author" content="">

  <!--  Mobile Viewport Fix
        j.mp/mobileviewport & davidbcalhoun.com/2010/viewport-metatag 
  device-width : Occupy full width of the screen in its current orientation
  initial-scale = 1.0 retains dimensions instead of zooming out if page height > device height
  maximum-scale = 1.0 retains dimensions instead of zooming in if page width < device width
  -->
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">


  <!-- Place favicon.ico and apple-touch-icon.png in the root of your domain and delete these references -->
  <link rel="shortcut icon" href="https://bonsmots.fr/favicon.ico">
  <link rel="apple-touch-icon" href="https://bonsmots.fr/apple-touch-icon.png">


  <!-- CSS : implied media="all" -->
  <link rel="stylesheet" href="https://bonsmots.fr/css/style.css?v=1">

  <!-- For the less-enabled mobile browsers like Opera Mini -->
  <link rel="stylesheet" media="handheld" href="https://bonsmots.fr/css/handheld.css?v=1">

  <!-- The website stylesheet -->
  <link rel="stylesheet" href="https://bonsmots.fr/css/arrows.css">
 
  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script src="https://bonsmots.fr/js/modernizr-1.5.min.js"></script>

  <!-- BonsMots.fr: if this is the flex grid player page, we add the required FLEX header lines here -->
<?php
if ($is_grid){
  include("flex-player/player-header.php");
}else if($is_editor){
  include("flex-editor/editor-header.php");
}
?>

</head>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->

<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->

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