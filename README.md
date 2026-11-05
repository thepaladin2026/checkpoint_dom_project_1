# Shopping Cart – DOM Workshop

## Run the project

1. Open `index.html` in a browser, or serve the folder with a local development server.
2. The Bootstrap and Font Awesome files are loaded from their CDNs, so an internet connection is needed for those visual elements.

For a local server, run this command from inside the `Shopping-Card` folder:


## Implemented behavior

- `+` increases the quantity of the matching product.
- `-` decreases the quantity but never below zero.
- The total is recalculated after every quantity change and product deletion.
- The heart toggles the liked state and turns red when active.
- Deleting the final product displays an empty-cart message.

The starting quantities remain at `0`, matching the values in the supplied HTML.
