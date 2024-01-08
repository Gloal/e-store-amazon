import { addToCart, cart, loadCartFromStorage, removeFromCart } from "../../data/cart.js";

describe('test-suite: addToCart', function () {
    it("adds an existing product to the cart", function(){
        //addToCart does not return anything so cannot use .toEqual
        spyOn(localStorage.__proto__, 'getItem').and.callFake(function() {
            return JSON.stringify([{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 4
            }
            ]);
        })

        spyOn(Object.getPrototypeOf(localStorage), 'setItem') 

        //must be called so that the cart we want is returned instead on the imported one
        loadCartFromStorage();

        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 4);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d" );
        console.log(cart[0]);

        expect(cart[0].quantity).toEqual(8);
    });

    it("adds a new product to the cart", function() {
        console.log(cart)

    //FIXME: GET SPYON TO OVERRRIDE - currently doesnt work. return error - expecting spy but got function for setItem but simply doesnt do anything for  for getItem!
    //Object.getPrototypeOf(localStorage) to get the prototype of the localStorage object
    //it is readying localStorage as a function, not an object

        spyOn(localStorage.__proto__, 'getItem').and.callFake(function() {
            return JSON.stringify([]);
        })
        console.log(typeof(localStorage)) //object
        console.log(Object.getPrototypeOf(localStorage)) //StoragePrototype { key: key(), getItem: getItem(), setItem: setItem(), removeItem: removeItem(), clear: clear(), length: Getter, … }

        console.log(typeof(localStorage.__proto__)) //object

        //spyOn(localStorage.__proto__, 'setItem') //this works  BUT __proto__ is deprecated and discouraged to use as it doesnt exist on some objects and isnt supported in some browsers
       spyOn(Object.getPrototypeOf(localStorage), 'setItem') //preferred method to use


        loadCartFromStorage();
        console.log(cart)

        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        })
    });