async function addAllMiddleware() {
    // try {
    //     // Fetch the list of middleware files from the server
    //     const response = await fetch('/middleware/files.json'); // Replace with your endpoint that lists middleware files
    //     if (!response.ok) {
    //         throw new Error(`Failed to fetch middleware files: ${response.statusText}`);
    //     }

    //     const middlewareFiles = await response.json();

    //     // Add each middleware file as a <script> tag to the <head> section
    //     middlewareFiles.forEach(file => {
    //         const script = document.createElement('script');
    //         script.type = 'text/javascript';
    //         script.src = `/middleware/${file}`;
    //         document.head.appendChild(script);
    //     });

    //     if (!window.middlewareAdded) {
    //         console.log("All middleware files have been added to the head.");
    //         window.middlewareAdded = true;
    //     }
    // } catch (error) {
    //     console.error('Error adding middleware files:', error);
    // }
}

// Call the function to add all middleware files
addAllMiddleware();