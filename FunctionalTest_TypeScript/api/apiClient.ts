//APIRequestContext: Playwright’s interface for making HTTP requests (GET, POST, PUT, DELETE, etc.)
import {APIRequestContext} from '@playwright/test'
import fs from 'fs';

//Reads the access token from a file || Assumes the token is stored in authToken.txt
const access_token = fs.readFileSync('authToken.txt', 'utf-8').trim();

//This defines a class called ApiClient || export allows you to import and use it in other files
export class ApiClient {
    //Stores an instance of APIRequestContext||private means it can only be accessed inside this class || This is the object that actually sends HTTP requests
    private requestContext: APIRequestContext

    //The constructor receives a requestContext parameter of type APIRequestContext and assigns it to the private property
    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext
    }

    //Sends an HTTP GET request || endpoint is the API path (e.g. /users/1) || Returns a Playwright APIResponse
    async get(endpoint: string) {
        console.log('GET request to:', endpoint);
        return this.requestContext.get(endpoint, {headers:{'Accept': 'application/json', 'Authorization': `Bearer ${access_token}`}})
    }

    //Sends an HTTP POST request || data is the request body || Playwright automatically serializes it as JSON
    async post(endpoint: string, data?: any) {
        console.log('GET request to:', endpoint);
        console.log('Data:', data);
        return this.requestContext.post(endpoint, {data,headers:{'Accept': 'application/json', 'Authorization': `Bearer ${access_token}`}})
    } 

    //Sends an HTTP PUT request || Usually used to update existing resources
    async put(endpoint: string, data: any) {
        return this.requestContext.put(endpoint, {headers:{'Accept': 'application/json', 'Authorization': `Bearer ${access_token}`}})
    }

    //Sends an HTTP DELETE request || Usually used to delete resources
    async delete(endpoint: string) {
        return this.requestContext.delete(endpoint, {headers:{'Accept': 'application/json', 'Authorization': `Bearer ${access_token}`}})
    }
}
