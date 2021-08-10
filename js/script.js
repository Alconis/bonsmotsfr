/* Author: Nicolas Demange pour Bonsmots.fr

*/

$(document).ready(function() {
  $('.alexandria').popupWindow({ 
    centerBrowser:1 
  }); 

  /*
   * REGISTER POPUP
   */ 
  $("a#modal-create-account").click(function(){centerPopupRegister();loadPopupRegister();});
  $("#popupRegisterClose").click(function(){disablePopupRegister();});
  $("#backgroundPopup").click(function(){disablePopupRegister();});

  // Form validation via jquery plugin : http://jquery.bassistance.de/validate/demo/
  $("#registerForm").validate({
		submitHandler: function(form) {
			var login = $("input#login").val();
			var password= $("input#password1").val();
			var mail= $("input#email1").val();

			registerUser(login,password,mail);
			return false;
		},
		rules: {
			login: {
				required: true,
				minlength: 2
			},
			password1: {
				required: true,
				minlength: 2
			},
			password2: {
				required: true,
				minlength: 2,
				equalTo: "#password1"
			},
			email1: {
				required: true,
				email: true
			},
			email2: {
				required: true,
				email: true,
				equalTo: "#email1"
			}
		},
		messages: {
			login: "Tapez un identifiant d'au moins 2 lettres",
			password: {
				required: "Donnez un mot de passe",
				minlength: "Le mot de passe doit avoir au moins 2 lettres"
			},
			confirm_password: {
				required: "Confirmez le mot de passe",
				minlength: "Le mot de passe doit avoir au moins 2 lettres",
				equalTo: "Re-tapez le m�me mot de passe que ci-dessus"
			},
			email: "Entrez une adresse mail valide"
		}
	});


  /*
   * LOGIN POPUP
   */ 
  $("a#modal-login").click(function(){centerPopupLogin();loadPopupLogin();});
  $("#popupLoginClose").click(function(){disablePopupLogin();});
  $("#backgroundPopup").click(function(){disablePopupLogin();});

  // Form validation via jquery plugin : http://jquery.bassistance.de/validate/demo/
  $("#loginForm").validate({
		submitHandler: function(form) {
			var login = $("input#loginname").val();
			var password= $("input#loginpass").val();

			logUser(login,password);
			return false;
		},
		rules: {
			loginname: {
				required: true,
				minlength: 2
			},
			loginpass: {
				required: true,
				minlength: 2
			}
		},
		messages: {
			loginname: "Tapez votre identifiant",
			loginpass: "Donnez un mot de passe"
		}
	});
  

  /*
   * DICO FORM
   */ 
  var searchBoxText = "Chercher dans le Bon Dico...";
  $(".dico-search").focus(function(e){
    $(this).addClass("active");
    if($(this).attr("value") == searchBoxText ) $(this).attr("value", "");
  });
  $(".dico-search").blur(function(e){
    $(this).removeClass("active");
    if($(this).attr("value") == "") $(this).attr("value", searchBoxText );
  });
  $("#dico-form").validate({
        submitHandler: function(form) {
            $('#dico-result').hide();
            var word= $("input#word").val();

            searchDico(word);
            return false;
        }
  });
  $("#dico-add-form").validate({
        submitHandler: function(form) {
            $('#dico-add-result').hide();
            var word= $("input#dico-add-word").val();
            var definition= $("input#dico-add-definition").val();
            var level= $("select#dico-add-level").val();

            addDico(word, definition, level);
            return false;
        }
  });
  $("#dico-result").hide();
  $("#dico-add-result").hide();

  $(".form-textinput").focus(function(e){
    $(this).addClass("active");
  });
  $(".form-textinput").blur(function(e){
    $(this).removeClass("active");
  });

  /*
   * WELCOME MESSAGE
   */ 

  // hides the welcome message if user already clicked it
  if (!(typeof localStorage === 'undefined')){
    if (localStorage.showWelcomeMessage == 'false'){$('#welcome-message').hide();}
  }

  // hides the welcome message on clicking the link
  $('a#welcome-message-hide').click(function() {
    $('#welcome-message').slideUp('slow');

    // Use Html5 local storage to remember not to show the message during the session
    if (!(typeof localStorage === 'undefined')){
      localStorage.setItem('showWelcomeMessage', 'false');
    }
    return false;
  });
});

/*
 * POPUPS
 */

var popupRegisterStatus = 0;

function loadPopupRegister(){
  if(popupRegisterStatus ==0){
    $("#backgroundPopup").css({
      "opacity": "0.7"
    });
    $("#backgroundPopup").fadeIn("slow");
    $("#popupRegister").fadeIn("slow");
    popupRegisterStatus = 1;
  }
}

function disablePopupRegister(){
  if(popupRegisterStatus ==1){
    $("#backgroundPopup").fadeOut("slow");
    $("#popupRegister").fadeOut("slow");
    popupRegisterStatus = 0;
  }
}

function centerPopupRegister(){
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var popupHeight = $("#popupRegister").height();
  var popupWidth = $("#popupRegister").width();

  $("#popupRegister").css({
    "position": "absolute",
    "top": windowHeight/2-popupHeight/2,
    "left": windowWidth/2-popupWidth/2
  });

  $("#backgroundPopup").css({
    "height": windowHeight
  });
}

var popupLoginStatus = 0;

function loadPopupLogin(){
  if(popupLoginStatus ==0){
    $("#backgroundPopup").css({
      "opacity": "0.7"
    });
    $("#backgroundPopup").fadeIn("slow");
    $("#popupLogin").fadeIn("slow");
    popupLoginStatus = 1;
  }
}

function disablePopupLogin(){
  if(popupLoginStatus ==1){
    $("#backgroundPopup").fadeOut("slow");
    $("#popupLogin").fadeOut("slow");
    popupLoginStatus = 0;
  }
}

function centerPopupLogin(){
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var popupHeight = $("#popupLogin").height();
  var popupWidth = $("#popupLogin").width();

  $("#popupLogin").css({
    "position": "absolute",
    "top": windowHeight/2-popupHeight/2,
    "left": windowWidth/2-popupWidth/2
  });

  $("#backgroundPopup").css({
    "height": windowHeight
  });
}


/*
 * AJAX SERVICES
 */

function incrementGridDoneCount(gridId, nbErrors, loggedUserId){
	
	$.ajax({
		type: "GET",
		url: "https://bonsmots.fr/services/grid.php",
		data: "action=INCR_DONE&id=" + gridId + "&nbErrors=" + nbErrors + "&userId=" + loggedUserId,
		success: function(msg){
			//alert("good increment for " + gridId);
		}
	});
}

function registerUser(login,password,mail){
	$.post("https://bonsmots.fr/services/user.php",
		{ action: "add", login: login, password: password, mail: mail },
		function(data, textStatus, XMLHttpRequest){
			if ($(data.responseXML).find('ok')){
				$(location).attr('href','https://bonsmots.fr');
			}else{
				alert(XMLHttpRequest.responseXML);
			}
		},
		"xml"
	);
}

function logUser(login,password){
	$.post("https://bonsmots.fr/services/user.php",
		{ action: "login", login: login, password: password },
		function(data, textStatus, XMLHttpRequest){
			if ($(data.responseXML).find('ok')){
				$(location).attr('href','https://bonsmots.fr');
			}else{
				alert(XMLHttpRequest.responseXML);
			}
		},
		"xml"
	);
}

function popupAlexandria(word){
    $('#alexandria').popupWindow({ 
        windowURL:'http://www.sensagent.com/alexandria/getDataAlexandria.jsp?w=' + word + '&sl=fr&tl=fr&e=UTF-8&v=v1.5.0', 
        centerBrowser:1 ,
        windowName:'alexandria' 
    });
}

function searchDico(word){
  $.ajax({
    type : "GET",
    url : "https://bonsmots.fr/services/word.php",
    data : { action : "getDefinitions", w : word },
    dataType : "xml",
    success : function(data, textStatus, XMLHttpRequest){
      $('#dico-result').show();
      $('table.dico-result').show();
      $('#no-dico-result').hide();
      $('#dico-result-body').html("");
      var idx = 0;
      $('word', data).each(function(i){
        var word = $(this).attr("solution");
        var definition = $(this).attr("definition");
        var level = $(this).attr("level");
        var authorId = $(this).attr("authorId");

        $('#dico-result-body').append('<tr><td>' + (++idx) + '</td><td><a href="#" onClick="javascript:popupAlexandria(\'' + word + '\')"><strong>' + word + '</strong></a></td><td>' + definition + '</td><td><img src="https://bonsmots.fr/img/level_' + level + '.png"></td><td>' + authorId + '</td></tr>');
      });
      $('#dico-result caption').html( idx + " entr&eacute;es du Bon Dico pour '" + word + "'");

    },
    error : function(){
      $('#dico-result').show();
      $('table.dico-result').hide();
      $('#no-dico-result').html("Aucun r&eacute;sultat pour '" + word + "'");
      $('#no-dico-result').show();
    }
  });
}

function addDico(word, definition, level){
$.ajax({
    type : "GET",
    url : "https://bonsmots.fr/services/word.php",
    data : { action : "add", w : word, definition : definition, level : level },
    dataType : "xml",
    success : function(data, textStatus, XMLHttpRequest){
      $('#dico-add-result').show();
      $('#dico-add-result').html('<span style="color:#30732A;font-weight:bold;">Votre d&eacute;finition a bien &eacute;t&eacute; ajout&eacute;e au Bon Dico. Merci !</span>');
    },
    error : function(){
      $('#dico-add-result').show();
      $('#dico-add-result').html('<span style="color:#FF0000;font-weight:bold;">Echec d\'ajout au Bon Dico.</span>');
    }
  });
}
