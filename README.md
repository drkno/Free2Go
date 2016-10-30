# Free2Go
A trivial Mobi2Go proof of concept exploit that allows you to specify your own discount.

## How It Works
Mobi2Go does not appear to be verifying that user input is valid. This is probably because there are few user-input fields to validate and it is assumed that any code running on a webpage is genuine.
The easiest way to exploit this, with no modifications to the existing scripts on the page is to use the (mostly) unused tips field as follows:
```javascript
Mobi2Go.Order.setTip(-100);
```
The example above sets the tip to -$100, which will then be subtracted from the order price.

Key Points to take away:
- Never trust input from a client outside your control, even if there is client side verification
- Do not allow setting of fields (like tip) when they are not needed
- Never, ever, ever allow the client to control the price

This is one of many similar exploit routes that could be taken. 

## Using the Proof of Concept
*Only tested in Firefox 51.0a2*

1. Install the Firefox [Greecemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) extension. May *(untested)* also work in [TamperMonkey](https://tampermonkey.net/) for Google Chrome.
2. [Click here](../../raw/master/free2go.user.js) to install the script from this repository.
3. Navigate to any Mobi2Go web store. A non-exhaustive list includes:
    - [HellsPizza](https://hellpizza.com/nz/order/)
    - [BurgerFuel](https://www.burgerfuel.com/nz/order)
    - [BurgerWisconsin](https://www.burgerwisconsin.co.nz/order-online/index.html)
    - [Corianders](http://corianders.co.nz/order)
    - [Pita Pit](https://www.pitapit.co.nz/menu)
    - [Mexicali Fresh](http://www.mexicalifresh.co.nz/order-online/)
    - [La Porchetta](http://www.laporchetta.co.nz/order_online)
    - [Camile](https://www.camile.ie/order-online/)
    - [Habitual Fix](http://www.habitualfix.co.nz/order)
    - [BurgerBurger](http://burgerburger.co.nz/order/)
    - [Bird On A Wire](http://order.birdonawire.co.nz/)
    - [Mr Burger](https://mrburger.com.au/)
    - More.... There are so many that I am concerned that this hasn't been found before now.
4. Proceed with order as usual.
5. A new section will appear above your order called 'Discount'. Use this section to select your discount.
6. Checkout. Your custom discount will be applied (no verification....?!)

## Other Attack Vectors
These haven't been explored to the same extent.

- It appears that it is possible to set the price of food items
- The mobile app. Major chains such as McDonalds use this.


