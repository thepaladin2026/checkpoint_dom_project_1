"use strict";

function initializeShoppingCart() {
  const productsContainer = document.querySelector(".list-products");
  const totalElement = document.querySelector(".total");

  if (!productsContainer || !totalElement) {
    console.error("Shopping cart initialization failed: required HTML elements were not found.");
    return;
  }

  function getUnitPrice(productElement) {
    const priceElement = productElement.querySelector(".unit-price");

    if (!priceElement) {
      return 0;
    }

    const normalizedPrice = priceElement.textContent
      .trim()
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".");
    const unitPrice = Number.parseFloat(normalizedPrice);

    return Number.isFinite(unitPrice) ? unitPrice : 0;
  }

  function getQuantity(productElement) {
    const quantityElement = productElement.querySelector(".quantity");
    const quantity = quantityElement ? Number.parseInt(quantityElement.textContent, 10) : 0;

    return Number.isInteger(quantity) && quantity >= 0 ? quantity : 0;
  }

  function updateTotal() {
    const products = productsContainer.querySelectorAll(".product-item");
    let total = 0;

    products.forEach((productElement) => {
      total += getUnitPrice(productElement) * getQuantity(productElement);
    });

    total = Math.round((total + Number.EPSILON) * 100) / 100;
    totalElement.textContent = `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(total)} $`;
  }

  function updateEmptyState() {
    const hasProducts = productsContainer.querySelector(".product-item") !== null;
    let emptyMessage = productsContainer.querySelector(".empty-cart");

    if (!hasProducts && !emptyMessage) {
      emptyMessage = document.createElement("p");
      emptyMessage.className = "empty-cart";
      emptyMessage.textContent = "Your cart is empty.";
      productsContainer.appendChild(emptyMessage);
    } else if (hasProducts && emptyMessage) {
      emptyMessage.remove();
    }
  }

  productsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button || !productsContainer.contains(button)) {
      return;
    }

    const productElement = button.closest(".product-item");

    if (!productElement) {
      return;
    }

    const action = button.dataset.action;
    //const quantityElement = document.querySelector(".quantity");
    const quantityElement = productElement.querySelector(".quantity");

    switch (action) {
      case "increase": {
        if (!quantityElement) return;

        const nextQuantity = getQuantity(productElement) + 1;
        quantityElement.textContent = String(nextQuantity);
        updateTotal();
        break;
      }

      case "decrease": {
        if (!quantityElement) return;
        const nextQuantity = Math.max(0, getQuantity(productElement) - 1);
        quantityElement.textContent = String(nextQuantity);
        updateTotal();
        break;
      }

      case "delete": {
        productElement.remove();
        updateTotal();
        updateEmptyState();
        break;
      }

      case "like": {
        const isLiked = button.classList.toggle("is-liked");
        const productName = productElement.querySelector(".card-title")?.textContent.trim() || "item";

        button.setAttribute("aria-pressed", String(isLiked));
        button.setAttribute(
          "aria-label",
          isLiked ? `Remove ${productName} from favorites` : `Add ${productName} to favorites`
        );
        break;
      }

      default:
        break;
    }
  });

  // I put this here to Calculate the initial total in case starting quantities changed in the HTML.
  updateTotal();
  updateEmptyState();
}

document.addEventListener("DOMContentLoaded", initializeShoppingCart);
