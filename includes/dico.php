<div id="main-content">

<header><h1>Le BonDico de BonsMots.fr</h1></header>

<p>Le <strong>Bon Dico</strong> est le dictionnaire regroupant l'ensemble des d&eacute;finitions utilis&eacute;es dans les grilles de mots fl&ecirc;ch&eacute;s de BonsMots.fr
Dans le champ ci-dessous, vous pouvez rechercher des mots et d&eacute;finitions associ&eacute;es du Bon Dico. Si vous &ecirc;tes identifi&eacute; sur le site, vous pouvez m&ecirc;me
l'enrichir avec vos propres d&eacute;finitions ! Plus, le Bon Dico est fourni plus vos grilles seront ais&eacute;es &agrave; remplir, alors n'h&eacute;sitez pas !
</p>



<h2>Rechercher des mots/d&eacute;finition dans le Bon Dico</h2>
<p style="font-size:10px;"><em>Utilisez le champs ci-dessous pour vos recherches. Combinez les caract&egrave;res sp&eacute;ciaux suivants pour &eacute;largir votre recherche :</em>
<ul style="font-size:10px;">
<li><strong>' - '</strong> : <em>le tiret correspond &agrave; une et une seule lettre. Exemple : "-n-m-l" trouvera "animal" </em></li>
<li><strong>' * '</strong> : <em>l'&eacute;toile correspond &agrave; zero, une ou plusieurs lettres. Exemple : "anim*" trouvera "animal,animaux,anime,etc."</em></li>
</ul></p>
<div id="dico-search-box">
<form method="GET" class="dico-form" id="dico-form">
  <input class="dico-search" id="word" name="word" type="text" value="Chercher dans le Bon Dico..." />
  <input id="dico-send" type="submit" value="Rechercher" />
</form>
</div>

<div id="dico-result">
<span id="no-dico-result"></span>
<table class="dico-result">
  <caption>Entr&eacute;es du Bon Dico pour </caption>
  <thead>
    <tr>
      <th>#</th>
      <th>Mot</th>
      <th>D&eacute;finition</th>
      <th>Difficult&eacute;</th>
      <th>Auteur</th>
    </tr>
  </thead>
  <tbody id="dico-result-body">
  </tbody>
</table>
</div>

<?php if($the_user){?>

<h2>Ajouter une d&eacute;finition au Bon Dico</h2>
<div id="dico-add-box">
<form method="GET" class="dico-add-form" id="dico-add-form">
  <label for="dico-add-word">Mot :</label> <input id="dico-add-word" name="dico-add-word" class="form-textinput" type="text"></input>
  <label for="dico-add-definition">D&eacute;finition :</label> <input id="dico-add-definition" class="form-textinput" type="text"></input>
  <label for="dico-add-level">Difficult&eacute; :</label>
  <select name="level" id="dico-add-level">
    <option value="1">Facile</option>
    <option value="2">Moyen</option>
    <option value="3">Difficile</option>
  </select>

  <input id="dico-add-send" type="submit" value="Ajouter" />
</form>
</div>


<div id="dico-add-result">

</div>

<? } ?>
</div><!-- Main Content -->
