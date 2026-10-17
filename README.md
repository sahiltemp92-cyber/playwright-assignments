### Note on Core Playwright Package vs Test Runner Package
- **`playwright` (Core Package):** 
The low-level browser automation engine providing APIs to automate Chromium, Firefox, and WebKit for scripting, scraping, or integrating with custom test runners (e.g., Jest, Mocha).
- **`@playwright/test` (Test Runner Package):** The complete end-to-end testing framework built on top of the core engine, providing a built-in test runner, web-first assertions, fixtures, parallel execution, retries, and HTML reporting.

### Note on Page Fixture & Browser Context
- **`page` fixture:** Delivers one ready-to-use page for each test.
- **Browser Context:** Serves as a separate session container (similar to an incognito profile) that manages its own tabs and pages.
- **State Isolation:** Every fresh context starts with a completely isolated state (independent cookies, local storage, session storage, and cache), ensuring tests run without cross-contamination.
