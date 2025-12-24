//This imports the Playwright helper function defineConfig 
//That makes autocompletion, types, and validation easier when writing the config file.
import {defineConfig} from '@playwright/test';
//This imports the dotenv library, which lets you load environment variables from a .env file.
import * as dotenv from 'dotenv';
//This reads your .env file and loads variables into:
dotenv.config();

//The exported object contains all your test runner settings
export default defineConfig({
    //This tells Playwright that all my tests are inside the tests folder  
    testDir: './tests',
    //This sets the default timeout for each test to 30 seconds.
    //If a test runs longer than 30s → Playwright fails it.
    timeout: 30000,
    //If a test fails, retry it up to 1 more times
    retries: 1,
    //This tells Playwright which reporters to generate: Generates a clickable HTML report in
    reporter: [['html', {open: 'never'}], ['list']],
    globalSetup: './utils/global-setup.ts',
    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        viewport: {width: 1280, height: 720},
    }});

//npx playwright test
//npx playwright show-report
//npx playwright test --project="API Tests"    