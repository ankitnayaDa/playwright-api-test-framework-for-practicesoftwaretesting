import pytest
from utils.api_client import ApiClient

@pytest.fixture(scope="session")
def api():
    client = ApiClient()
    client.login()  # store token
    yield client
    client.close()