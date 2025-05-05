// navbar-sticky.js

// Function to add sticky behavior to the navbar and account portal
function makeNavbarSticky() {
    // Get the navigation bar element
    var navbar = document.getElementById("navigation-bar-container");
    var loginPane = document.getElementById("login-pane");
    var registerPane = document.getElementById("register-pane");
    var accountPane = document.getElementById("account-pane"); // Added account pane

    // Function to add sticky behavior when scrolling
    function stickyNavbar() {
        // Recalculate the offset dynamically
        var navbarOffset = navbar.offsetTop;

        // Check if the current scroll position is greater than or equal to the initial offset of the navbar
        if (window.pageYOffset >= navbarOffset) {
            // Add the 'fixed-top' class to make the navbar sticky
            navbar.classList.add("fixed-top");
            // Add padding to the body to prevent content from jumping when the navbar becomes sticky
            document.body.style.paddingTop = navbar.offsetHeight + "px";

            // Make the login pane follow the navbar
            if (loginPane) {
                loginPane.style.position = "fixed";
                loginPane.style.top = navbar.offsetHeight + 35 + "px"; // 35px below the navbar
                loginPane.style.right = "20px"; // Adjust as needed
            }

            // Make the register pane follow the navbar
            if (registerPane) {
                registerPane.style.position = "fixed";
                registerPane.style.top = navbar.offsetHeight + 35 + "px"; // 35px below the navbar
                registerPane.style.right = "20px"; // Adjust as needed
            }

            // Make the account pane follow the navbar
            if (accountPane) {
                accountPane.style.position = "fixed";
                accountPane.style.top = navbar.offsetHeight + 35 + "px"; // 35px below the navbar
                accountPane.style.right = "20px"; // Adjust as needed
            }
        } else {
            // Remove the 'fixed-top' class to make the navbar non-sticky
            navbar.classList.remove("fixed-top");
            // Reset the padding of the body
            document.body.style.paddingTop = 0 + "px";

            // Reset the login pane position
            if (loginPane) {
                loginPane.style.position = "absolute";
                loginPane.style.top = "95px"; // Original top position
                loginPane.style.right = "20px"; // Adjust as needed
            }

            // Reset the register pane position
            if (registerPane) {
                registerPane.style.position = "absolute";
                registerPane.style.top = "95px"; // Original top position
                registerPane.style.right = "20px"; // Adjust as needed
            }

            // Reset the account pane position
            if (accountPane) {
                accountPane.style.position = "absolute";
                accountPane.style.top = "95px"; // Original top position
                accountPane.style.right = "20px"; // Adjust as needed
            }
        }
    }

    // Call the stickyNavbar function when the page is scrolled
    window.onscroll = function () {
        stickyNavbar();
    };
}

// Call the makeNavbarSticky function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    makeNavbarSticky();
});
