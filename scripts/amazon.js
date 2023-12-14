import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = [];

products.forEach((product) => {
  const html = ` 
            <div class="product-container">
            <div class="product-image-container">
            <img
                class="product-image"
                src="${product.image}"
            />
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img
                class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
            </div>

            <div class="product-price">$${formatCurrency(product.priceCents)}
            )}</div>

            <div class="product-quantity-container">
            <select class="js-quantity-input">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
            </div>

            <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${
              product.name
            }">Add to Cart</button>
        </div>`;
  productsHTML += html;
});

const productGridEl = document.querySelector(".js-products-grid");
productGridEl.innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  //add a click event listener to each button
  button.addEventListener("click", () => {
    //add item to cart
    // console.log(event.target.dataset.productId); - if you pass event to function
    const productId = button.dataset.productId;
    const productQuantity = Number(document.querySelector(".js-quantity-input").value)
    addToCart(productId, productQuantity);
    console.log("productQuantity: "+ productQuantity);
    updateCartQuantity();

    console.log(cart);
  });
});


//FIXME: WHY DOES USING NUMBER(OPTION.VALUE) NOT LEAD TO A NUMBER BEING PASSED AS THE VALUE?
document.querySelectorAll("option").forEach((option) => {
  option.addEventListener("click", () => {
    console.log("Option value " + option.value);
    document.querySelector(".js-quantity-input").value = option.value;
  });
});



function updateCartQuantity(){
    const cartQuantityEl = document.querySelector(".js-cart-quantity");
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        console.log(cartItem.quantity);
        cartQuantity += cartItem.quantity;
      });
    cartQuantityEl.textContent = cartQuantity;
}