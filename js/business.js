const guaranteeSumInput = document.getElementById('guaranteeSumInput');
const guaranteeMonthInput = document.getElementById('guaranteeMonthInput');
const discountCheckbox = document.getElementById('discountCheckbox');

const totalSum = document.getElementById('totalSum');

let guaranteeSum = 10000;
let guaranteeMonth = 1;

function updateOutput() {
    const withoutDisc = Math.round(guaranteeSum / guaranteeMonth);
    const withDisc = discountCheckbox.checked ? Math.round(withoutDisc * 0.78) : withoutDisc;

    totalSum.textContent = `${withDisc.toLocaleString('ru-RU')} ₽`;
}


function handleInputChangeSum() {
    let value = parseInt(guaranteeSumInput.value.replace(/\D/g, '')) || 10000;
    const min = 10000;
    const max = 2400000000;
    value = Math.min(Math.max(value, min), max);
    guaranteeSum = value;
    guaranteeSumInput.value = value.toLocaleString('ru-RU');
    sumSlider.noUiSlider.set(value);
    updateOutput();
}

function handleInputChangeMonth() {
    let value = parseInt(guaranteeMonthInput.value.replace(/\D/g, '')) || 1;
    const min = 1;
    const max = 120;
    value = Math.min(Math.max(value, min), max);
    guaranteeMonth = value;
    guaranteeMonthInput.value = value;
    monthSlider.noUiSlider.set(value);
    updateOutput();
}

const sumSlider = document.getElementById('guaranteesummrange');
noUiSlider.create(sumSlider, {
    start: 10000,
    connect: [true, false],
    step: 10000,
    range: {
        min: 10000,
        '15%': 1000000,
        '70%': 100000000,
        max: 2400000000
    },
    pips: {
        mode: 'values',
        values: [10000, 2400000000],
        density: 1,
        format: {
            to: value => value >= 2400000000 ? `до ${value.toLocaleString('ru-RU')}₽` : `${value.toLocaleString('ru-RU')}₽`,
            from: Number
        }
    }
});

sumSlider.noUiSlider.on('slide', (values) => {
    const value = parseInt(values[0]);
    guaranteeSum = value;
    guaranteeSumInput.value = value.toLocaleString('ru-RU');
    updateOutput();
});

const monthSlider = document.getElementById('guaranteemonthrange');
noUiSlider.create(monthSlider, {
    start: 1,
    connect: [true, false],
    step: 1,
    range: { min: 1, max: 120 },
    pips: {
        mode: 'positions',
        values: [0, 100],
        density: 4,
        format: {
            to: value => value === 120 ? `до ${value} мес.` : `от ${value} мес.`,
            from: Number
        }
    }
});

monthSlider.noUiSlider.on('slide', (values) => {
    const value = parseInt(values[0]);
    guaranteeMonth = value;
    guaranteeMonthInput.value = value;
    updateOutput();
});

guaranteeSumInput.addEventListener('input', () => {
    guaranteeSumInput.value = guaranteeSumInput.value.replace(/[^\d ]+/g, '');
});
guaranteeSumInput.addEventListener('change', handleInputChangeSum);
guaranteeMonthInput.addEventListener('input', () => {
    guaranteeMonthInput.value = guaranteeMonthInput.value.replace(/[^\d]+/g, '');
});
guaranteeMonthInput.addEventListener('change', handleInputChangeMonth);
discountCheckbox.addEventListener('change', updateOutput);

guaranteeSumInput.value = guaranteeSum.toLocaleString('ru-RU');
guaranteeMonthInput.value = guaranteeMonth;
updateOutput();