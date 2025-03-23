import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUser from '../src/components/CreateUser';
import ReadDeleteUsers from '../src/components/ReadDeleteUsers';

// Generate random user name and email for testing
const name = (Math.random() + 1).toString(36).substring(7); // Generates a random string
const email = name + '@' + (Math.random() + 1).toString(36).substring(7) + '.io'; // Constructs a random email

/**
 * Test Case: Adds a new user
 * - Renders the CreateUser component
 * - Fills out the name and email fields
 * - Clicks the "Create" button
 * - Checks if a success message appears with the new user's name
 */
it('adds a new user', async () => {
    // Render the CreateUser component
    render(<CreateUser />);

    // Simulate user typing into the name input field
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: name } });

    // Simulate user typing into the email input field
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: email } });

    // Simulate clicking the "Create" button
    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    // Wait for the success message to appear and verify it contains the created user's name
    const message = await screen.findByText(`User created successfully: ${name}`);
    expect(message).toBeInTheDocument();
});

/**
 * Test Case: Deletes the correct user
 * - Renders the ReadDeleteUsers component
 * - Waits for the newly created user to appear
 * - Finds the correct <li> element containing that user
 * - Clicks the "Delete" button inside that <li>
 * - Verifies that the user is removed from the list
 */
it("deletes the correct user", async () => {
    // Render the ReadDeleteUsers component
    render(<ReadDeleteUsers refresh={0} />);

    // Wait for the user with the generated name to appear in the list
    const userItem = await screen.findByText(new RegExp(name, "i"));

    // Find the nearest <li> element that contains this user
    const userListItem = userItem.closest("li");

    // Locate the delete button inside the <li> element
    const deleteButton = userListItem.querySelector("button");

    // Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // Ensure the user is no longer in the document
    await waitFor(() => {
        expect(screen.queryByText(new RegExp(name, "i"))).not.toBeInTheDocument();
    });
});