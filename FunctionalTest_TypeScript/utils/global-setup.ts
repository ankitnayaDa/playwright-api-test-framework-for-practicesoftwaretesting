//Imports Playwright’s API client type and expect function
import { request, expect } from "@playwright/test";
//fs:used to read/write files.
import fs from 'fs';

//Defines the shape of the login response
//Helps TypeScript know that Response.json() will return an object with these fields
export type loginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

//Global setup function to run before all tests
async function globalSetup() {
    console.log('Running global setup...');
    //creates a new API client
    const apiContext = await request.newContext({baseURL: process.env.BASE_URL});
    //Sends a POST request to the login endpoint with email and password from environment variables
    const Response = await apiContext.post('/users/login', {data: {
            email: process.env.email,
            password: process.env.password
        }
    });
    console.log(Response)
    //Validates the response and extracts the token
    expect(Response.ok()).toBeTruthy();
    //Parse the JSON response to get the access token
    const body = await Response.json() as loginResponse;
    //Extract the token and ensure it exists
    const token = body.access_token;
    expect(token).toBeTruthy();
    // Save the token to a file for later use in tests
    fs.writeFileSync('authToken.txt', token);
    console.log('Authentication token saved.');
    await apiContext.dispose();
}

export default globalSetup;