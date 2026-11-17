# Product Inventory Management API

## Description
A REST API built using Node.js and Express.js to manage product inventory. Product data is stored in an in-memory JavaScript array.

## Technologies Used
- Node.js
- Express.js
- Postman

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

Server runs at: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add a new product |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/filter?category=Electronics` | Filter products by category |

## Testing
All API endpoints were tested using Postman, including successful and unsuccessful requests and validation cases.

## Note
Data is stored in memory and resets when the server restarts.