import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

//TODO: QUESTION _ WHY DOES THIS
//HAVE TO BE INITIALISED TO AN EMPTY STRING
//OR ZERO if we are going to += , if not initialized, 
//it is undefined

function renderCart() {
    let cartHTML = "";

    document.querySelector(".js-order-summary").innerHTML = cartHTML;

  cart.forEach((item) => {
    const productId = item.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      } 
    });

    console.log("Matching product: " + matchingProduct);
    cartHTML += `
    <div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>

      <div class="cart-item-details">
        <div class="product-name"> 
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link js-delete-link link-primary" data-product-id=${productId}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
            `;
  });


document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      console.log("delete");
      const productId = link.dataset.productId;
      removeFromCart(productId);
      console.log(cart);
      renderCart();
    });
  });
}

renderCart();

//FIXME:must be called after render cart- otherwise the buttons will not exist when adding the eventListener
//FIXME: must turn into funtion cause it only loads once currently - must put it in the function above
//so that they keey getting event listeners repeatedly added on creation!


