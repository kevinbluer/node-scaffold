$(function() { 

	$(document).ready(function() {

		$("#when").val(new Date());

		loadmap();

	});

	$("#submit").click(function() {

		$.post(
			"/api/entity/add",
			{
				what: $("#what").val(),
				detail: $("#detail").val(),
				resources: $("#resources").val(),
				where: [ $("#lat").val(), $("#lng").val() ],
				when: $("#when").val(),
				who: $("#who").val()
			},
			function(data) {
				if (data.saved === "yep") {
					window.alert("saved");
				}
				else {
					window.alert("not good");
				}
			},
			"json"
		).error(function(e, xhr) {
			window.alert(e);
		});

	});

	function loadmap() {
		
		//check if the geolocation object is supported, if so get position
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				displayLocation,
				displayError
			);
		}
		else {
			displayError(null);
		}
	}

	function displayLocation(position) {
		$("#lat").val(position.coords.latitude);
		$("#lng").val(position.coords.longitude);
	}

	function displayError() {
		window.alert("Damn, it not work.");
	}

});