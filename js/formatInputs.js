import {priceFormatter} from './formatters.js';

const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term'),
      form = document.querySelector('#form'),
      totalCost = document.querySelector('#total-cost');

const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
};

const cleaveCost = new Cleave('#input-cost', cleavePriceSettings),
      cleaveDownPayment = new Cleave('#input-downpayment', cleavePriceSettings);

calcMortgage();

form.addEventListener('input', () => {
    calcMortgage();
});

function calcMortgage() {
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();

    totalCost.textContent = priceFormatter.format(totalAmount);
}