// navbar-sticky.js

// Function to add sticky behavior to the navbar and account portal
function makeNavbarSticky() {
    // Get the navigation bar element
    var navbar = document.getElementById("navigation-bar-container");
    var accountPortal = document.querySelector(".account-portal-container");

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

            // Make the account portal follow the navbar
            if (accountPortal) {
                accountPortal.style.position = "fixed";
                accountPortal.style.top = navbar.offsetHeight + 15 + "px"; // 15px below the navbar
                accountPortal.style.right = "20px"; // Adjust as needed
            }
        } else {
            // Remove the 'fixed-top' class to make the navbar non-sticky
            navbar.classList.remove("fixed-top");
            // Reset the padding of the body
            document.body.style.paddingTop = 0 + "px";

            // Reset the account portal position
            if (accountPortal) {
                accountPortal.style.position = "absolute";
                accountPortal.style.top = "95px"; // Original top position
                accountPortal.style.right = "20px"; // Adjust as needed
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
