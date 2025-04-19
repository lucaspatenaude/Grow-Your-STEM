// navbar-sticky.js

// Function to add sticky behavior to the navbar
function makeNavbarSticky() {
    // Get the navigation bar element
    var navbar = document.getElementById("navigation-bar-container");

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
        } else {
            // Remove the 'fixed-top' class to make the navbar non-sticky
            navbar.classList.remove("fixed-top");
            // Reset the padding of the body
            document.body.style.paddingTop = 0;
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
