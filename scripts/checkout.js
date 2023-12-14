import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//TODO: QUESTION _ WHY DOES THIS 
//HAVE TO BE INITIALISED TO AN EMPTY STRING 
//OR ZERO if we are going to += , if not initialized, it is undefined
let cartHTML = "";


cart.forEach((item)=>{
    const productId = item.productId;
    let matchingProduct;

    products.forEach((product)=>{
        if(productId === product.id){
            matchingProduct = product;
        }
    })

    console.log(matchingProduct);
    cartHTML +=`
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
          <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${productId}">
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
            `
})

document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelectorAll(".js-delete-link").forEach((link)=>{
    link.addEventListener('click', () => {
        const productId = link.dataset.productId
        removeFromCart(productId);
        console.log(cart);
    })
})