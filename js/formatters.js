export const percentFormatter = new Intl.NumberFormat('ru-RU', {style: 'percent', maximumFractionDigits: 3}),
             priceFormatter = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 2}),
             priceFormatterDecimals = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 2});