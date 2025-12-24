import { expect } from '@playwright/test';
import * as Types from '../types/types';

export let userID: string;
export let brandID: string ;
export let categoryID: string ;
export let productID: string;
export let cartID: string;

//Exports a reusable function
//brands: an array of Brand objects
export async function validateBrands(reponseData: any)  {
    const body =  (await reponseData.json()) as Types.Brand[];
    console.log('Response:', body);
    expect (reponseData.status()).toBe(200);
    const brand = body.find(b => b.name === "ForgeFlex Tools");
    brandID = brand!.id
    console.log('Actual brand ID:',brandID);
    const actualNames = body.map((b: any) => b.name);
    console.log('Actual brand names:', actualNames);
    console.log('Expected brand names:', Types.expectedBrandNames);
    expect(actualNames).toEqual(expect.arrayContaining(Types.expectedBrandNames));
}

export async function getUserID(reponseData: any)  {
    const body =  (await reponseData.json()) as Types.CreateUserResponse;
    console.log('Response:', body);
    expect (reponseData.status()).toBe(200);
    userID = body.id;
    expect(userID).toBeTruthy();
}

export async function validatecategories(reponseData: any)  {
    const body =  (await reponseData.json()) as Types.Category[];
    console.log('Response:', body);
    expect (reponseData.status()).toBe(200);
    const brand = body.find(b => b.name === "Hammer");
    categoryID = brand!.id
    expect(categoryID).toBeTruthy()
    console.log('Actual brand ID:',categoryID);
}

export async function validateProducts(reponseData: any)  {
    const body =  (await reponseData.json()) as Types.GetProductResponse;
    console.log('Response:', body);
    expect (reponseData.status()).toBe(200);
    const product = body.data.find(b => b.name === "Thor Hammer");
    productID = product!.id
    console.log('Actual brand ID:',productID);
    expect(categoryID).toBeTruthy()
}

export async function GetCartID (reponseData: any): Promise<string> {
    const body =  (await reponseData.json()) as Types.CreateCartResponse;
    console.log('Response:', body);
    expect (reponseData.status()).toBe(201);   
    cartID = body.id 
    expect(cartID).toBeTruthy()
    return cartID
}

export async function VerifyCart (reponseData: any) {
    const body =  (await reponseData.json()) as Types.cart;
    console.log(body)
    expect (reponseData.status()).toBe(200);
    const product = body.cart_items.find(b => b.product_id === productID);
    expect(product!.product_id).toBe(productID);
} 

export async function ValidateCardAfterUpdate(responseData: any) {
    const body =  (await responseData.json()) as Types.UpdateCart;
    console.log(body)
    expect (responseData.status()).toBe(200);
    expect(body.message).toBe("You can only have one Thor Hammer in the cart.");
}
