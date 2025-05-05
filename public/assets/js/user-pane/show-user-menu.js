$(document).ready(function () {
	// When #user is clicked
	$("#user-profile-button").click(function () {
		$("#register-pane-container").hide();
		// Toggle the visibility of the login container
		$("#login-pane-container").toggle();
	});

	$("#register-page-login-button").click(function (event) {
		event.preventDefault(); // Prevent the default action of following the link

		$("#register-pane-container").hide();
		$("#login-pane-container").show();
	});
});

$(document).ready(function () {
	// Listen for click event on the register button
	$("#login-page-register-button").click(function (event) {
		event.preventDefault(); // Prevent the default action of following the link

		$("#login-pane-container").hide();
		// Show the register container
		$("#register-pane-container").show();
	});
});

// Show the login screen if there is an alert message
$(document).ready(function () {
	if ($("#login-pane-container").find(".alert").length > 0) {
			$("#login-pane-container").show();
	}
	else if ($("#register-pane-container").find(".alert").length > 0) {
		$("#register-pane-container").show();
	}
});

$(document).ready(function () {
	// When #user is clicked
	$("#user-profile-button").click(function () {
		// Toggle the visibility of the login container
		$("#account-pane-container").toggle();
	});
});