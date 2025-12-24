# Test Frameworks (Playwright) — TypeScript + Python

Overview
--------
This repository contains two Playwright-based test suites targeting the
practice API at https://api.practicesoftwaretesting.com/:

- `PlaywrightTypeScriptFunctionalTest`: API functional tests written in
  TypeScript using `@playwright/test`.
- `PlaywrightPythonNegativeTests`: Negative API tests written in Python using
  Playwright's sync API request context and `pytest`.

This README explains how to set up and run both frameworks locally.

Prerequisites
-------------
- Node.js 16+ (for the TypeScript suite)
- Python 3.8+ (for the Python suite)
- Git (optional)

TypeScript suite (PlaywrightTypeScriptFunctionalTest)
---------------------------------------------------
Directory: [PlaywrightTypeScriptFunctionalTest](PlaywrightTypeScriptFunctionalTest)

Quick setup

```bash
cd PlaywrightTypeScriptFunctionalTest
npm install
# install Playwright browsers (optional for API-only tests, required for UI tests)
npx playwright install
```

Configuration
- Base URL and credentials are loaded from environment variables (`.env`).
- `playwright.config.ts` sets `globalSetup` which logs in and writes an
  `authToken.txt` file used by tests. See [playwright.config.ts](PlaywrightTypeScriptFunctionalTest/playwright.config.ts)
  and [utils/global-setup.ts](PlaywrightTypeScriptFunctionalTest/utils/global-setup.ts).

Run tests

```bash
cd PlaywrightTypeScriptFunctionalTest
# generate auth token and run global setup automatically when running tests
npx playwright test
# view HTML report
npx playwright show-report
```

Notes
- The API client reads the token from `authToken.txt` produced by global setup: [api/apiClient.ts](PlaywrightTypeScriptFunctionalTest/api/apiClient.ts).
- Tests live in [tests](PlaywrightTypeScriptFunctionalTest/tests).

Python suite (PlaywrightPythonNegativeTests)
------------------------------------------
Directory: [PlaywrightPythonNegativeTests](PlaywrightPythonNegativeTests)

Quick setup

```bash
cd PlaywrightPythonNegativeTests
python -m venv .venv
.\.venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install playwright pytest
# (Optional) Install browsers if needed
playwright install
```

Run tests

```bash
cd PlaywrightPythonNegativeTests
pytest -q
# run a single file
pytest tests/test_negative.py -q
```

Notes
- The Python `ApiClient` logs in using credentials found in `utils/api_client.py` and stores the `access_token` on the client instance used by the session-scoped fixture defined in `conftest.py`.
- See [PlaywrightPythonNegativeTests/README.md](PlaywrightPythonNegativeTests/README.md) for more details on the Python tests.

Repository layout (key files)
-----------------------------
- [PlaywrightTypeScriptFunctionalTest/playwright.config.ts](PlaywrightTypeScriptFunctionalTest/playwright.config.ts) — Playwright runner config
- [PlaywrightTypeScriptFunctionalTest/tests](PlaywrightTypeScriptFunctionalTest/tests) — TypeScript tests
- [PlaywrightTypeScriptFunctionalTest/api/apiClient.ts](PlaywrightTypeScriptFunctionalTest/api/apiClient.ts) — TypeScript API helper
- [PlaywrightTypeScriptFunctionalTest/utils/global-setup.ts](PlaywrightTypeScriptFunctionalTest/utils/global-setup.ts) — obtains auth token
- [PlaywrightPythonNegativeTests/conftest.py](PlaywrightPythonNegativeTests/conftest.py) — Python `api` fixture
- [PlaywrightPythonNegativeTests/utils/api_client.py](PlaywrightPythonNegativeTests/utils/api_client.py) — Python API helper
- [PlaywrightPythonNegativeTests/tests/test_negative.py](PlaywrightPythonNegativeTests/tests/test_negative.py) — Python negative tests

Tips & troubleshooting
----------------------
- If TypeScript tests fail due to missing `authToken.txt`, run the tests once which triggers `global-setup` to create it, or run the global setup script directly by invoking Playwright tests (the setup runs automatically).
- Ensure the environment variable `BASE_URL` (used by `playwright.config.ts`) matches the Python client's `BASE_URL` if you run both suites against the same target.
- If you change test credentials, update the values used in the TypeScript `.env` or the Python `ApiClient` respectively.

Next steps (optional)
---------------------
- Add a `requirements.txt` or `pyproject.toml` for the Python suite to pin dependencies.
- Add CI pipeline steps to run both suites (the repo already contains `ci/pipeline.yml`).
