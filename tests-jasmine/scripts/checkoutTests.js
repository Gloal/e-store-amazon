import { renderCart } from '../../scripts/checkout.js'
import { cart, loadCartFromStorage } from "../../data/cart.js";


describe ("test-suite: renderCart", function (){
    it('displays the cart', function(){
            document.querySelector(".js-test-container").innerHTML =`<div class="js-order-summary"></div> `;
        
        spyOn(localStorage.__proto__, 'getItem').and.callFake(function() {
            return JSON.stringify(
                [
                  {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                  },
                  {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                  },
                ]);
        });
    
        console.log(typeof(localStorage))
        console.log(Object.getPrototypeOf(localStorage)) 

       spyOn(Object.getPrototypeOf(localStorage), 'setItem')


        loadCartFromStorage();
        renderCart();

        expect(document.querySelectorAll(".cart-item-container")).toEqual(2)

    })

})