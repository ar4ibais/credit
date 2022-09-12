const inputCost = document.querySelector('#input-cost'),
      inputDownPayment = document.querySelector('#input-downpayment'),
      inputTerm = document.querySelector('#input-term');

const cleavePriceSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
};

const cleaveCost = new Cleave('#input-cost', cleavePriceSettings);

const cleaveDownPayment = new Cleave('#input-downpayment', cleavePriceSettings);