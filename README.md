
---

# Bank Application

This is a simple bank application that allows you to manage customer balances with deposit and withdrawal functionalities. The application is built using Typescript with Express for the backend, and MongoDB for the database.

## Features

- Create new customers.
- Deposit money into a customer’s account.
- Withdraw money from a customer’s account (with checks to prevent overdrafts).
- Retrieve a customer’s balance.
- Retrieve the total balance of the bank.

## Setup Instructions

1. **Install Dependencies**:

   Navigate to the project directory in your terminal and run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

2. **Start the Server**:

   Start the server by running:

   ```bash
   npm start
   ```

   This will start the Express server on the specified port.

3. **Run Tests**:

   To run the tests, use:

   ```bash
   npm test
   ```

## Folder Structure

- **`src`**: Contains the source code for the application.
    - **`models`**: Mongoose models for MongoDB.
    - **`routes`**: Express route handlers.
    - **`controllers`**: Logic for handling requests and responses.

## Notes

- Ensure that MongoDB is running and accessible at the URI specified in the `.env` file.
- The application uses CORS middleware for handling cross-origin requests.

## Further Improvements

- **MongoDB Transactions:** To ensure atomicity for multi-document operations, consider setting up MongoDB replica sets and integrating transactions. This was not implemented in this exercise due to time constraints.

---