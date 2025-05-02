$(document).ready(function () {
	// When #user is clicked
	$("#user-profile-button").click(function () {
		$("#register-screen-container").hide();
		// Toggle the visibility of the login container
		$("#login-screen-container").toggle();
	});

	$("#register-page-login-button").click(function (event) {
		event.preventDefault(); // Prevent the default action of following the link

		$("#register-screen-container").hide();
		$("#login-screen-container").show();
	});
});

$(document).ready(function () {
	// Listen for click event on the register button
	$("#login-page-register-button").click(function (event) {
		event.preventDefault(); // Prevent the default action of following the link

		$("#login-screen-container").hide();
		// Show the register container
		$("#register-screen-container").show();
	});
});

// Show the login screen if there is an alert message
$(document).ready(function () {
	if ($("#login-screen-container").find(".alert").length > 0) {
			$("#login-screen-container").show();
	}
	else if ($("#register-screen-container").find(".alert").length > 0) {
		$("#register-screen-container").show();
	}
});

$(document).ready(function () {
	// When #user is clicked
	$("#user-profile-button").click(function () {
		// Toggle the visibility of the login container
		$("#account-screen-container").toggle();
	});
});