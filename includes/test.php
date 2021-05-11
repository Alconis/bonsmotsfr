<div id="main-content">
<?php
$pspell_link = pspell_new("fr");

$word = $_GET["w"];

if ($word){
  if (!pspell_check($pspell_link, $word)) {
    echo "Le mot n'existe pas.<br />";
    $suggestions = pspell_suggest($pspell_link, $word);
    echo "<ul>";
    foreach ($suggestions as $suggestion) {
$url = "http://www.sensagent.com/alexandria/getDataAlexandria.jsp?w=".urlencode($suggestion)."&sl=fr&tl=fr&e=UTF-8&v=v1.5.0";

        echo "<li>Suggestion: <a href='" . $url . "' class='alexandria' name='windowX'>" . htmlentities($suggestion) . "</a></li>";
    }
    echo "</ul>";
  }else{
    echo "Le mot existe dans le dictionnaire.<br/>";
  }
}


?>
<form method="get" action="">
<input type="text" name="w" value=""/>
<input type="submit" value="Valider le mot" style="height:30px"/>
</form>

</div>