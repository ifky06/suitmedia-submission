// Import the createClient function from the next-sanity library.
const { createClient } = require('next-sanity');

// Create a class called SanityClient.
class SanityClient {
    // Define a static _instance property to store the singleton instance of the class.
    static _instance = null;

    // Define a private client property to store the Sanity client.
    client;

    // Define a private constructor.
    constructor() {
        // If the _instance property is null, create a new Sanity client and store it in the _instance property.
        if (SanityClient._instance === null) {
            this.client = createClient({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                dataset: process.env.NEXT_PUBLIC_DATASET,
                apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
                useCdn: true,
            });
        }
    }

    // Define a static getClient method that returns the singleton instance of the class.
    static getClient() {
        // If the _instance property is null, create a new Sanity client and store it in the _instance property.
        if (SanityClient._instance === null) {
            SanityClient._instance = new SanityClient();
        }

        // Return the _instance property.
        return SanityClient._instance.client;
    }
}

// Export the SanityClient class.
module.exports = SanityClient;
