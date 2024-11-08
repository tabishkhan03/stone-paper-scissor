// Wait for SDK to be available
(function initializeAppwrite() {
    // Check if SDK is loaded
    if (typeof window.Appwrite === 'undefined') {
        // If not loaded, try again in 100ms
        setTimeout(initializeAppwrite, 100);
        return;
    }

    // Initialize Appwrite
    const client = new window.Appwrite.Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API endpoint
        .setProject('672b387e000186463e03'); // Your project ID

    const account = new window.Appwrite.Account(client);
    const database = new window.Appwrite.Databases(client);
    const ID = window.Appwrite.ID; // Get the ID utility

    const DATABASE_ID = '672b397b002f0f0f14a9';
    const COLLECTION_ID = '672e74db0034451e4099';

    // Signup
    const signupForm = document.querySelector('#signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("hello signup")
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            try {
                // Create a new user
                const user = await account.create(
                    ID.unique(),
                    email,
                    password,
                    name
                );

                // Create a player document in the database
                await database.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    user.$id,
                    { name, email, highScore: 0 }
                );

                alert('Signup successful! Please log in.');
                window.location.href = 'login.html';
            } catch (err) {
                console.error(err);
                alert('Signup failed. Check console for details.');
            }
        });
    }

    // Login
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            try {
                await account.createEmailSession(email, password);
                alert('Login successful!');
                window.location.href = 'profile.html';
            } catch (err) {
                console.error(err);
                alert('Login failed. Check console for details.');
            }
        });
    }

    // Fetch Profile
    const profileContent = document.querySelector('#profileContent');
    if (profileContent) {
        (async () => {
            try {
                // Get the logged-in user's details
                const user = await account.get();

                // Fetch the player's document from the database
                const player = await database.getDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    user.$id
                );

                profileContent.innerHTML = `
                    <h3>Welcome, ${player.name}</h3>
                    <p>Email: ${player.email}</p>
                    <p>Unique ID: ${player.$id}</p>
                    <p>High Score: ${player.highScore}</p>
                `;
            } catch (err) {
                console.error(err);
                alert('You are not logged in.');
                window.location.href = 'login.html';
            }
        })();
    }

    // Logout
    const logoutButton = document.querySelector('#logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await account.deleteSession('current');
                alert('Logged out successfully.');
                window.location.href = 'login.html';
            } catch (err) {
                console.error(err);
                alert('Logout failed.');
            }
        });
    }
})();