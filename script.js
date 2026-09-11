// const numbers = document.querySelectorAll('.number');
// const operations = document.querySelectorAll('.operation');
const keypads = document.querySelectorAll('.keypad');
const calcPreview = document.querySelector('.calc-preview');
const samaDengan = document.querySelector('.sama-dengan');
const result = document.querySelector('.result'); 

let calculate = [];
let numToCalc = '';

keypads.forEach(keypad => {
    keypad.addEventListener('click', function() {
        if (keypad.classList.contains('number')) {
            calcPreview.value += keypad.textContent;
            numToCalc += keypad.textContent; 
        } else if (keypad.classList.contains('operation')) {
            calcPreview.value += keypad.textContent;
            calculate.push(Number(numToCalc));
            numToCalc = '';
            calculate.push(keypad.textContent.replaceAll(' ', ''));
        } else if (keypad.classList.contains('sama-dengan')) {
            calculate.push(Number(numToCalc));
            while (calculate.length > 1) {
                let index = 0;
                if (calculate.indexOf('x') > 0) {
                    index = calculate.indexOf('x');
                    const hasil = kalikan(calculate[index-1], calculate[index+1]);
                    calculate.fill(hasil, index-1, index).splice(index, 2);
                } else if (calculate.indexOf('/') > 0) {
                    index = calculate.indexOf('/');
                    const hasil = bagi(calculate[index-1], calculate[index+1]);
                    calculate.fill(hasil, index-1, index).splice(index, 2);
                } else if (calculate.indexOf('+') > 0) {
                    index = calculate.indexOf('+'); 
                    const hasil = tambahkan(calculate[index-1], calculate[index+1]);
                    calculate.fill(hasil, index-1, index).splice(index, 2);
                } else if (calculate.indexOf('-') > 0) {
                    index = calculate.indexOf('-');
                    const hasil = kurangkan(calculate[index-1], calculate[index+1]);
                    calculate.fill(hasil, index-1, index).splice(index, 2);
                }
            }
            result.textContent = calculate;
        }
    });
});


function tambahkan(a, b) {
    return a + b;
}

function kurangkan(a, b) {
    return a - b;
}

function kalikan(a, b) {
    return a * b;
}

function bagi(a, b) {
    return a / b;
}
