export let cart = JSON.parse(localStorage.getItem('cart'));

//if the cart is empty, use this as default
if(!cart){
  cart =
[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 4,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];
}

export function addToCart(productId, productQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {  
    let quantity = productQuantity;
    cart.push({ productId, quantity });
    console.log("new " + productId);
  }

  //once the cart is saved, update localstorage
  saveToStorage();

}

/**Loop through card and add all 
 * items that dont have productId then assign to card array */
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((item)=>{
    if(productId !== item.productId){
      newCart.push(item);
    }
    cart = newCart;
    //update the cart in localStorage
    saveToStorage();
  })
}

function saveToStorage(){
  console.log("Adding to storage");
  localStorage.setItem('cart', JSON.stringify(cart));
}