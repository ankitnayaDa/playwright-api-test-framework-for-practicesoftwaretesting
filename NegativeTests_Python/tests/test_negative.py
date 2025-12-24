import pytest

#Create a Cart
def test_create_cart(api):
    response = api.post("/carts", "")
    body = response.json()
    print(body)
    api.cartID = body["id"]
    print(api.cartID)

#Add invalid items ID to the cart
@pytest.mark.parametrize("item_id", ["invalid-123", "nonexistent", ""])
def test_add_invalid_item_id(api, item_id):
    ivaapi = "/carts/" + api.cartID
    payload = {"product_id": item_id, "quantity": 1}
    response = api.post(ivaapi, payload)
    print(response)
    assert response.status in [400, 404]
    api.assert_error_invalid(response)

#Add invalid item quality to the cart
@pytest.mark.parametrize("quantity", [0, -1, "abc"])
def test_add_invalid_item_quantity(api, quantity):
    ivaapi = "/carts/" + api.cartID
    payload = {"product_id": "01KD5VK89576KACP5ZR5PPVTRQ", "quantity": quantity}
    response = api.post(ivaapi, payload)
    print(response)
    assert response.status in [400, 404]
    api.assert_error_invalid(response)

#Deleteing a non-exstaing cart
def test_delete_non_existing_cart(api):
    response = api.delete("/carts/999999")
    assert response.status == 404
    api.assert_error_delete(response)