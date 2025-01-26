# Project Victory React

## Setup

1. Create a `.env` file in the root directory with the following content:
    ```env
    # For local development
    VITE_DEV_API_BASE_URL=...

    # For production
    VITE_PROD_API_BASE_URL=...
    ```
2. Modify the `VITE_DEV_API_BASE_URL` and `VITE_PROD_API_BASE_URL` to match the URL of the backend server.
3. In the `src` directory, update the `config.js` file to use the local or production URL.