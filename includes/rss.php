<?php

include("config-db.php");

$sql = 'SELECT G.title, G.level, G.date, G.url, U.login, U.mail FROM `arrows_grids` G, `arrows_user` U WHERE G.author = U.id AND G.private = "" AND G.status = "published" ORDER BY G.date DESC LIMIT 0 , 10';
$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());


header('Content-Type: text/xml');
echo('<?xml version="1.0" encoding="iso-8859-1"?>');

$current_time = time();
$current_date = date(DATE_RSS, $current_time);

?>

<rss version="2.0">
    <channel>
        <title>BonsMots.fr</title>
        <description>Flux RSS de BonsMots.fr- Grilles de Mots fleches en ligne pour tous</description>
        <lastBuildDate><?=$current_date;?></lastBuildDate>
        <link>http://www.bonsmots.fr</link>


<?php
while($data = mysql_fetch_assoc($req)){

$item_time = strtotime($data["date"]);
$item_date = date(DATE_RSS, $item_time);

?>
        <item>
            <title><?=$data["title"];?></title>
            <author><?=$data["mail"];?></author>
            <description>La grille de mots fléchés intitulée <?=$data["title"];?> de niveau <?=$data["level"];?> créée par <?=$data["login"];?> est disponible sur BonsMots.fr.</description>
            <pubDate><?=$item_date;?></pubDate>
            <link><?=$data["url"];?></link>

        </item>
<?php } ?>
    </channel>
</rss>
