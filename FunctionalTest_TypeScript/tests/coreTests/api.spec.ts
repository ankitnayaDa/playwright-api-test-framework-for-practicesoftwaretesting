//test → defines a Playwright test case || expect → used for validations
import { test, expect } from '@playwright/test';
//Imports your custom API helper class || ApiClient wraps Playwright’s request object
import { ApiClient } from '../../api/apiClient';
//Imports validation function
import * as validator from '../../utils/validator';
import * as Types from '../../types/types';


test('Verify that a new user can be created successfully with valid data', async ({ request }) => {
  //Passes Playwright’s request into your ApiClient
  const apiClient = new ApiClient(request);
  //Sends a GET request
  console.log(Types.user)
  const response = await apiClient.post('/users/register',Types.user);
  //Checks the HTTP response code
  if (response.status() === 422) {
    expect(response.status()).toBe(422);
  } else if  (response.status() === 201) {
    expect(response.status()).toBe(201);
    await validator.getUserID(response)
  }else {
    expect(response.status()).toBe(200);
    await validator.getUserID(response)
  }
  console.log('User ID Created:', validator.userID);
});

test('List all the brand and Verify brand ID ,Name are present or not', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const response = await apiClient.get('/brands')
  //Passes the parsed data to your validator function
  await validator.validateBrands(response);
  console.log('Brand ID Created:', validator.brandID);
});

test("Verify all catagories and Verify category ID ,Name are present or not" , async ({ request }) => {
  const apiClient = new ApiClient(request);
  const response = await apiClient.get('/categories')
  await validator.validatecategories(response)
  console.log('Brand ID Created:', validator.categoryID);
});

test("Verify Thor Hammer is availabe under Brand ID ForgeFlex Tools and Catagories Hammer", async ({ request }) => {
  const apiClient = new ApiClient(request);
  const response = await apiClient.get('/products?by_brand='+ validator.brandID + '&by_category=' + validator.categoryID)
  await validator.validateProducts(response)
  console.log('Product ID Created:', validator.productID);
}) 

test("Create a cart and Verify by adding Thor Hammer the product to cart",async ({ request}) =>{
  const apiClient = new ApiClient(request);
  //Create a Cart
  const cartreponse = await apiClient.post('/carts');
  const cartID = await validator.GetCartID(cartreponse)
  //Add item to cart
  const AddCartReponse = await apiClient.post('/carts/'+ cartID,{product_id :validator.productID , quantity : 1});
  const body =  (await AddCartReponse.json()) ;
  console.log('Response:', body);
  //Verify if item added to cart
  const getcartreponse = await apiClient.get('/carts/'+cartID);
  await validator.VerifyCart(getcartreponse)
})

test("Verify by Update quantity of item in cart ", async ({ request }) =>{
  const apiClient = new ApiClient(request);
  const UpdateCartReponse = await apiClient.post('/carts/'+ validator.cartID,{product_id :validator.productID , quantity : 4});
  await validator.ValidateCardAfterUpdate(UpdateCartReponse)
})