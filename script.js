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
            if (allChar[allChar.length-1] == 'x' || allChar[allChar.length-1] == '/' || allChar[allChar.length-1] == '+' || allChar[allChar.length-1] == '-') {
                allChar = removeLastChar(allChar);
                allChar += button.textContent;
                calcPreview.value = allChar;
            } else {
                allChar += button.textContent;
                calcPreview.value = allChar;
            }
        } else if (button.classList.contains('sama-dengan') && allChar.length > 1) {

            // mengubah seluruh string menjadi array berisi angka angka yang dipisahkan oleh symbol operasinya
            numToCalc = giveSpace(allChar).split(' ');

            // mengecek plus atau minus dari angka pertama
            if (numToCalc[0] == '') {
                numToCalc.splice(0, 3, numToCalc[1] += numToCalc[2]);
            }

            // mengubah semua string angka menjadi tipe data Number sehingga dapat di operate
            const toNumber = numToCalc.map(item => {
                if (item == 'x' || item == '/' || item == '+' || item == '-') {
                    return item;
                } else {
                    return Number(item);
                }
            });
            for (let i = 0; toNumber.length > 2; i++) {
                if (toNumber.indexOf('x') > 0 || toNumber.indexOf('/') > 0) {
                    if (toNumber[i] == 'x' || toNumber[i] == '/') {
                        const hasil = operate(toNumber[i-1], toNumber[i+1], toNumber[i]);
                        toNumber.fill(hasil, i-1, i).splice(i, 2);
                        i = 0;    
                    }
                } else if (toNumber[i] == '+' || toNumber[i] == '-') {
                    const hasil = operate(toNumber[i-1], toNumber[i+1], toNumber[i]);
                    toNumber.fill(hasil, i-1, i).splice(i, 2);
                    i = 0;
                }
            }
            result.textContent = toNumber;
            calcPreview.value = toNumber;
            allChar = String(toNumber);
        } else if (button.classList.contains('del')) {
            allChar = removeLastChar(allChar);
            calcPreview.value = allChar;
            if (allChar.length == 0) {
                result.textContent = allChar;
            }
        } else if (button.classList.contains('del-all')) {
            allChar = '';
            calcPreview.value = allChar;
            result.textContent = allChar;
        } 
    });
});

function giveSpace(string) {
    return string.replaceAll('+', ' + ')
        .replaceAll('-', ' - ')
        .replaceAll('x', ' x ')
        .replaceAll('/', ' / ')
}

// function mengoperasikan perhitungan berdasarkan simbolnya  
function operate(nilaiA, nilaiB, symbol) {
    switch(symbol) {
        case 'x' : 
            return kalikan(nilaiA, nilaiB);
            break;

        case '/' :
            return bagi(nilaiA, nilaiB);
            break;
        
        case '+' : 
            return tambahkan(nilaiA, nilaiB);
            break;

        case '-' :
            return kurangkan(nilaiA, nilaiB);
            break;
    }
}

function removeLastChar(string) {
    string = string.split('');
    string.pop();
    return string.join('');
}

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

