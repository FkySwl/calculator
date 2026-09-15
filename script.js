const buttons = document.querySelectorAll('.keypad');
const calcPreview = document.querySelector('.calc-preview');
const samaDengan = document.querySelector('.sama-dengan');
const result = document.querySelector('.result'); 

// membuat tempat untuk menaruh karakter seluruh karakter sementara ketika menekan tombol
let allChar = '';
// tempat untuk menaruh angka yang sudah di jadikan number dan juga seluruh operasinya
let numToCalc = [];

// memberikan event ke semua tombol
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (button.classList.contains('number')) {
            allChar += button.textContent;
            calcPreview.value = allChar;
        } else if (button.classList.contains('operation')) {
            allChar += button.textContent;
            calcPreview.value = allChar;
        } else if (button.classList.contains('sama-dengan') && allChar.length > 1) {
            numToCalc = allChar.split(' ');
            if (numToCalc[0] == '') {
                numToCalc.splice(0, 3, numToCalc[1] += numToCalc[2]);
            }
            const toNumber = numToCalc.map(item => {
                if (item == 'x' || item == '/' || item == '+' || item == '-') {
                    return item;
                } else {
                    return Number(item);
                }
            });
            while (toNumber.length > 2) {
                console.log("jalan");
                let index = 0;
                if (toNumber.indexOf('x') > 0) {
                    index = toNumber.indexOf('x');
                    const hasil = kalikan(toNumber[index-1], toNumber[index+1]);
                    toNumber.fill(hasil, index-1, index).splice(index, 2);
                } else if (toNumber.indexOf('/') > 0) {
                    index = toNumber.indexOf('/');
                    const hasil = bagi(toNumber[index-1], toNumber[index+1]);
                    toNumber.fill(hasil, index-1, index).splice(index, 2);
                } else if (toNumber.indexOf('+') > 0) {
                    index = toNumber.indexOf('+'); 
                    const hasil = tambahkan(toNumber[index-1], toNumber[index+1]);
                    toNumber.fill(hasil, index-1, index).splice(index, 2);
                } else if (toNumber.indexOf('-') > 0) {
                    index = toNumber.indexOf('-');
                    const hasil = kurangkan(toNumber[index-1], toNumber[index+1]);
                    toNumber.fill(hasil, index-1, index).splice(index, 2);
                }
            }
            result.textContent = toNumber;
            calcPreview.value = toNumber;
            [allChar] = toNumber;
        } else if (button.classList.contains('del') && calcPreview.value.length > 0 && numToCalc.length > 0 && allChar.length > 0) {
            
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

function calculate(array) {

}
