import {priceFormatter, priceFormatterDecimals} from './formatters.js';

const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term'),
      form = document.querySelector('#form'),
      totalCost = document.querySelector('#total-cost'),
      totalMonthPayment = document.querySelector('#total-month-payment'),
      maxPrice = 100000000;

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
    let cost = +cleaveCost.getRawValue();

    if (cost > maxPrice) {
        cost = maxPrice;
    }

    const totalAmount = cost - cleaveDownPayment.getRawValue();
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

sliderCost.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));

    inputCost.value = sliderValue;

    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
});


let sliderDownpayment = document.querySelector('#slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 375000 ,
    connect: 'lower',
    step: 100000,
    range: {
        'min': 375000 * 0.15,
        'max': maxPrice
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ''
    })
});

sliderDownpayment.noUiSlider.on('slide', function() {
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));

    inputDownPayment.value = sliderValue;

    cleaveDownPayment.setRawValue(sliderValue);
    calcMortgage();
});


let sliderTerm = document.querySelector('#slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    step: 1,
    range: {
        'min': 1,
        'max': 30
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: ''
    })
});

sliderTerm.noUiSlider.on('update', function() {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));

    inputTerm.value = sliderValue;

    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();
});

inputCost.addEventListener('input', () => {
    const value = +cleaveCost.getRawValue();

    sliderCost.noUiSlider.set(value);

    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');
    } else {
        inputCost.closest('.param__details').classList.remove('param__details--error');
    }
});

inputCost.addEventListener('change', () => {
    const value = +cleaveCost.getRawValue();

    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(maxPrice);
    }
});