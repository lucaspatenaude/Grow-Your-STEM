async function addAllJS() {
    try {
        // Fetch the list of JavaScript files from the server
        const response = await fetch('/js/files.json'); // Replace with your endpoint that lists JS files
        if (!response.ok) {
            throw new Error(`Failed to fetch JavaScript files: ${response.statusText}`);
        }

        const jsFiles = await response.json();

        // Add each JavaScript file to the <head> or <body> section
        jsFiles.forEach(file => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `/js/${file}`;
            script.defer = true; // Ensure scripts are loaded asynchronously
            document.body.appendChild(script); // Append to the body
        });

        if (!window.jsAdded) {
            console.log("All JavaScript files have been added to the body.");
            window.jsAdded = true;
        }
    } catch (error) {
        console.error('Error adding JavaScript files:', error);
    }
}

// Call the function to add all JavaScript files
addAllJS();