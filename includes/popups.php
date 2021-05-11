<!-- REGISTER POPUP -->
<div id="popupRegister" class="popup">
	<a href="#" id="popupRegisterClose" class="popup-close-button">x</a>
	<h1>S'inscrire sur BonsMots.fr</h1>
	<p>En cr&eacute;ant un compte sur le site, vous allez pouvoir sauvegarder vos progressions sur les grilles d&eacute;j&agrave; remplies,
	accumuler des bonus d'aide (Lettres donn&eacute;es) et accumuler des points pour devenir le roi des mots fl&eacute;ch&eacute;s.</p>
	<p>En plus, vous aurez acc&egrave;s &agrave; l'&eacute;diteur avanc&eacute; de grilles de mots fl&eacute;ch&eacute;s pour cr&eacute;er
	vos propres grilles et les partager avec tout le monde et/ou vos amis.</p>

	<form id="registerForm" action="#" enctype="multipart/form-data" method="post">
		<fieldset id="pt1">
			<legend>1.</legend>
			<h3>Entrez un identifiant.</h3>
			<div class="help">Il vous rendra unique sur le site !</div>

			<label for="login">Identifiant</label>
			<input type="text" id="login" name="login" tabindex="1" />
		</fieldset>
		<fieldset id="pt2">
			<legend>2.</legend>
			<h3>Entrez un mot de passe.</h3>

			<div class="help">Faites en sorte qu'on ne puisse pas le deviner facilement</div>
			<label for="password1">Mot de passe</label>
			<input type="text" id="password1" name="password1" tabindex="2" />
			<label for="password2">Confirmez le</label>
			<input type="text" id="password2" name="password2" tabindex="3" />
		</fieldset>
		<fieldset id="pt3">
			<legend>3.</legend>
			<h3>Entrez une adresse mail.</h3>

			<div class="help">Il nous servira &agrave; vous renvoyer votre mot de passe en cas d'oubli. Ca arrive.</div>
			<label for="email1">Mail</label>
			<input type="text" id="email1" name="email1" tabindex="4" />
			<label for="email2">Confirmez le</label>
			<input type="text" name="email2" tabindex="5" />
		</fieldset>
		<fieldset id="pt4">		
			<input type="submit" id="submitRegisterForm" tabindex="6" value="Valider mon inscription sur BonsMots.fr &raquo;" />
		</fieldset>
	</form>

</div>

<!-- LOGIN POPUP -->
<div id="popupLogin" class="popup">
	<a href="#" id="popupLoginClose" class="popup-close-button">x</a>
	<h1>M'identifier sur BonsMots.fr</h1>

	<form id="loginForm" action="#" enctype="multipart/form-data" method="post">
		<div><label for="loginname">Identifiant</label>
		<input type="text" id="loginname" name="loginname" tabindex="1" />
		<label for="loginpass">Mot de passe</label>
		<input type="password" id="loginpass" name="loginpass" tabindex="2" /></div>
		<a href="#">J'ai oubli&eacute; mon mot de passe...</a>
		<input type="submit" id="submitLoginForm" tabindex="3" value="M'identifier sur BonsMots.fr &raquo;" />
	</form>

</div>
<div id="backgroundPopup"></div>