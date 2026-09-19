# Dummy Store E-Commerce Project

This project is a small front-end e-commerce website built with HTML, CSS, and JavaScript. It uses the DummyJSON API to load products dynamically and stores the cart state in browser `localStorage` so users can keep items even after refreshing the page.

## Overview

The app simulates a modern online store with:

- a landing page with hero section and featured products
- a products page that fetches product data from an API
- a cart page with quantity controls and total price
- local persistence using `localStorage`
- dark mode toggle
- responsive layout for desktop and mobile screens
- fallback 404-style screen if the API fails to load

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- DummyJSON API: https://dummyjson.com/products
- Browser `localStorage` for cart and theme persistence

## Project Structure

```text
dummyAPI/
├── index.html          # Home page
├── product.html        # Products listing page
├── cart.html           # Shopping cart page
├── 404.html            # Error / fallback page
├── dummyApi.js         # Product page logic and API fetching
├── home.js             # Home page logic
├── cart.js             # Cart logic and total calculations
├── homestyle.css       # Home page styling
├── productstyle.css    # Products page styling
├── cart.css            # Cart page styling
├── 404.css             # Error page styling
└── README.md           # Project documentation
```

## Features

### 1. Product Catalog from API
The product list is loaded from the DummyJSON API with:

```javascript
fetch('https://dummyjson.com/products')
```

The returned data is parsed and displayed as product cards with:

- image
- title
- category
- description
- price
- add-to-cart button

### 2. Shopping Cart
When the user clicks the Add to Cart button:

- the selected product is added to the cart array
- if the item already exists, its quantity increases
- the cart is saved to `localStorage`

Cart data is stored in a key named:

```javascript
localStorage.setItem('cart', JSON.stringify(cart));
```

This makes the cart persist even after reloading the page.

### 3. Quantity Management
On the cart page, users can:

- increase quantity with `+`
- decrease quantity with `-`
- remove a product completely
- see the updated total price automatically

### 4. Local Storage Persistence
The app uses browser storage to keep important state such as:

- cart items
- dark mode preference

Example:

```javascript
const cart = JSON.parse(localStorage.getItem('cart')) || [];
```

and

```javascript
localStorage.setItem('darkMode', 'dark');
```

### 5. Dark Mode
The app includes a theme toggle button that updates the theme and saves it in localStorage. When the page loads, it reads the saved theme and applies it automatically.

### 6. Error Handling
If the API request fails, the app hides the shop section and loads a styled fallback page instead of breaking the interface.

## How It Works

1. The page loads.
2. The script checks `localStorage` for saved cart and theme values.
3. The app fetches product data from DummyJSON.
4. Each product is rendered as a card.
5. Clicking Add to Cart updates the cart array and saves it to `localStorage`.
6. The cart page reads the stored cart and displays the current items and totals.
7. The theme is restored on reload from `localStorage`.

## How to Run the Project

Because this is a front-end static project, there is no installation step required.

### Option 1: Open directly in a browser
Open `index.html` in your browser.

### Option 2: Use a local web server
From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also use VS Code Live Server extension for easier preview.

## Notes

- The app depends on internet access to fetch product data from the DummyJSON API.
- Since it is a static app, all data is client-side and the product list is not stored in a backend database.
- Cart and dark mode preferences are saved locally on the user's browser.

## Potential Improvements

You can extend this project by adding:

- product search filters
- category filtering
- sorting by price or rating
- checkout form
- login/signup
- backend database integration
- admin dashboard
- payment system

## Conclusion

This project is a simple but complete front-end e-commerce example that demonstrates how to combine:

- external API integration
- dynamic DOM rendering
- local browser storage
- shopping cart logic
- theme management
- modern UI design

It is a great foundation for learning full front-end e-commerce development.
