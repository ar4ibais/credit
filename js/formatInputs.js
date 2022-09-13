import {priceFormatter, priceFormatterDecimals} from './formatters.js';

const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term'),
      form = document.querySelector('#form'),
      totalCost = document.querySelector('#total-cost'),
      totalMonthPayment = document.querySelector('#total-month-payment');

const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
};

const cleaveCost = new Cleave('#input-cost', cleavePriceSettings),
      cleaveDownPayment = new Cleave('#input-downpayment', cleavePriceSettings),
      cleaveTerm = new Cleave(inputTerm, cleavePriceSettings);

calcMortgage();

form.addEventListener('input', () => {
    calcMortgage();
});

function calcMortgage() {
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.textContent = priceFormatter.format(totalAmount);

    const creditRate = +document.querySelector('input[name="program"]:checked').value,
          monthRate = creditRate / 12;

    const years = +cleaveTerm.getRawValue(),
          months = years * 12;

    const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months)) * 100;
    
    totalMonthPayment.textContent = priceFormatterDecimals.format(monthPayment);
}

let sliderCost = document.querySelector('#slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    step: 100000,
    range: {
        'min': 375000,
        '50%': [10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ''
    })
});

sliderCost.noUiSlider.on('update', function() {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));

    inputCost.value = sliderValue;

    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
})