// Define the application URL
const appAddress = 'http://localhost:5173';

export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations', // Each VU shares the workload across iterations
            vus: 5, // Number of virtual users running the test concurrently
            iterations: 10, // Total number of test iterations across all VUs
            maxDuration: '2m', // Maximum test duration before it stops
            options: {
                browser: {
                    type: 'chromium', // Specifies the browser type (Chromium, Firefox, WebKit)
                },
            },
        },
    },
};

export default async function () {
    // Create a new browser page instance
    const page = await ();

    try {
        // Step 1: Navigate to the application
        await page.goto(appAddress);

        // Step 2: Generate a random name and email for the user
        const name = Math.random().toString(36).substring(7);
        const email = `${name}@${Math.random().toString(36).substring(7)}.io`;

        // Step 3: Fill in the name and email input fields
        await page.locator('input[placeholder="Name"]').type(name);
        await page.locator('input[placeholder="Email"]').type(email);

        // Step 4: Click the "Create" button to add the user
        const button = page.locator('#create-user');
        await button.click();

        // Step 5: Refresh the page to ensure the user appears in the list
        await page.reload();

        // Step 6: Retrieve all `<li>` elements representing users in the list
        const listItems = await page.$$('li');

        // Validate that `<li>` elements exist in the DOM
        //will show as error because playwright is not in codespaces
        (listItems, {
            'Found li elements': (items) => items.length > 0, // Ensure at least one `<li>` is found
        });

        // Step 7: Iterate through each `<li>` to find the user that was just added
        for (const item of listItems) {
            // Extract the text content of the `<li>` element
            const textContLi = await item.textContent();

            // Extract the "Name" value from the text content
            const nameValue = textContLi.split(", Name: ")[1].split(", Email: ")[0];

            // If the name matches the newly created user, delete it
            if (nameValue == name) {
                // Retrieve the `id` attribute from the `<li>` element
                const id = await item.getAttribute('id');

                // Construct the delete button selector using the `<li>` ID
                const deleteId = id.replace('li-', '#delete-');

                // Click the delete button to remove the user
                await page.locator(deleteId).click();
            }
        }

    } finally {
        // Step 8: Close the browser after execution
        await page.close();
    }
}