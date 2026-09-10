const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const calculateArea = document.querySelector('.calculate');
const samaDengan = document.querySelector('.sama-dengan');

let getNumber = [];
let getSymbol = '';
let toCalc = '';

numbers.forEach(number => {
    number.addEventListener('click', function() {
        calculateArea.value += number.textContent;
        toCalc += number.textContent;
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', function() {
        calculateArea.value += operation.textContent;
        getSymbol = operation.textContent;
        getNumber.push(Number(toCalc));
        toCalc = '';
    })
})

samaDengan.addEventListener('click', function() {
    getNumber.push(Number(toCalc));
    let [angka1, angka2] = getNumber;
    const result = angka1 + angka2;
    console.log(result)
})






