async function addAllCSS() {
    try {
        // Fetch the list of CSS files from the server
        const response = await fetch('/css/files.json'); // Replace with your endpoint that lists CSS files
        if (!response.ok) {
            throw new Error(`Failed to fetch CSS files: ${response.statusText}`);
        }

        const cssFiles = await response.json();

        // Add each CSS file to the <head> section
        cssFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `/css/${file}`;
            document.head.appendChild(link);
        });

        if (!window.cssAdded) {
            console.log("All CSS files have been added to the head.");
            window.cssAdded = true;
        }
    } catch (error) {
        console.error('Error adding CSS files:', error);
    }
}

// Call the function to add all CSS files
addAllCSS();