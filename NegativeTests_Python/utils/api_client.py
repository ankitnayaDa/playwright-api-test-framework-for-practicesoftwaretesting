from playwright.sync_api import sync_playwright

class ApiClient:
    BASE_URL = "https://api.practicesoftwaretesting.com/"
    email = "customer@practicesoftwaretesting.com"
    password = "welcome01"

    def __init__(self):
        # Initialize Playwright and request context || launches the Playwright engine (Node.js process) in the background
        # self.playwright contains objects for APIRequestContext
        self.playwright = sync_playwright().start()
        # This creates a Playwright-native API session (APIRequestContext).
        self.request = self.playwright.request.new_context(
            base_url=self.BASE_URL,
            extra_http_headers={"Content-Type": "application/json"}
        )
        self.access_token = None
        self.cartID = None

    def login(self):
        """Login and store access token"""
        payload = {"email": self.email, "password": self.password}
        response = self.request.post("/users/login", data=payload)
        data = response.json()
        self.access_token = data["access_token"]

    def post(self, endpoint, payload):
        """POST request with auth"""
        headers = {"Authorization": f"Bearer {self.access_token}"}
        return self.request.post(endpoint, data=payload, headers=headers)

    def delete(self, endpoint):
        """DELETE request with auth"""
        headers = {"Authorization": f"Bearer {self.access_token}"}
        return self.request.delete(endpoint, headers=headers)

    def assert_error_delete(self, response):
        body = response.json()
        assert "Cart doesnt exists" in body["message"]
        assert isinstance(body["message"], str)
    
    def assert_error_invalid(self, response):
        body = response.json()
        assert "Resource not found" in body["message"]
        assert isinstance(body["message"], str)

    def close(self):
        self.request.dispose()
        self.playwright.stop()