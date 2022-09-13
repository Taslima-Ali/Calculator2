let inputOne = '';
let inputTwo = '';
let operator = ''; 

window.addEventListener('keydown', keyBoard );

const header = document.querySelector('.displayed')
const div1 = document.createElement('div');
const div2 = document.createElement('div');
div1.classList.add('lineone');
div2.classList.add('linetwo');
header.appendChild(div1);
header.appendChild(div2);

const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button =>  {
    button.addEventListener('click', (e) => {
        clickedNumber(e.target.textContent);
    });
});

const numberOperations = document.querySelectorAll('[data-operation]');
numberOperations.forEach(button =>  {
    button.addEventListener('click', (e) => {
        display(e.target.textContent);
    });
});

const equalsBtn = document.querySelector('[data-equals]');
equalsBtn.addEventListener('click',() =>{
    if (inputTwo != '' && inputOne != ''){
        operate();
    }
});

const decimalBtn = document.querySelector('[data-decimal]');
decimalBtn.addEventListener('click', () => {
    addDecimal();
})

const deleteBtn = document.querySelector('[data-delete]');
deleteBtn.addEventListener('click',() => {
    deleteNumber();
})


const allClearBtn = document.querySelector('[data-clear]');
const lineOneText = document.querySelector('.lineone');
const lineTwoText = document.querySelector('.linetwo');

function clickedNumber(num) {
    if (inputOne !== '' && inputTwo!=='' && operator===''){
        inputOne = '';
        lineTwoText.textContent = inputTwo;
    }
    inputTwo += num;
    lineTwoText.textContent = inputTwo;
    if (inputTwo == 0 && operator===''){
        inputTwo -='0';
        lineTwoText.textContent = inputTwo; 
    }
}

function display(op){
    if (inputOne === ''){
        inputOne = inputTwo;
        displayCheck(op);
    } else if (inputTwo === ''){
        displayCheck(op);
    } else {
        operate();
        operator = op;
        lineTwoText.textContent = '';
        lineOneText.textContent = inputOne + '' + operator
    }
} 

function displayCheck(text){
    operator = text;
    //inputOne = inputTwo;
    lineOneText.textContent = inputOne + ' ' + operator;
    inputTwo = '';
    lineTwoText.textContent = '';

}
function diplayedResults(){
    lineOneText.textContent= '';
    operator = ''
    inputTwo = '';
}

function operate(){
    inputOne = Number(inputOne);
    inputTwo = Number(inputTwo);

    if (operator ==='+'){
        inputOne +=  inputTwo;
    } else if (operator ==='-'){
        inputOne -= inputTwo;
    } else if (operator ==='×'){
        inputOne *= inputTwo
    } else if (operator ==='÷'){
        if (inputTwo == 0){
            inputOne = 'Error, you cannot divide by 0';
            lineOneText.textContent = '';
            lineTwoText.textContent = inputOne;
            diplayedResults();
            return;
        }
        inputOne /= inputTwo;
    }
    inputOne = inputOne.toString();
    lineOneText.textContent='';
    lineTwoText.textContent=roundNumber(inputOne);
    diplayedResults();
}
function roundNumber(num){
    return Math.round(num * 1000000000)/1000000000;
}



function clearAll(){
    inputOne = '';
    inputTwo = '';
    operator = '';
    lineOneText.textContent = '';
    lineTwoText.textContent = '';
}
allClearBtn.addEventListener('click', clearAll )


function addDecimal(){
    if (!inputTwo.includes('.')){
        inputTwo += '.';
        lineTwoText.textContent = inputTwo;
    }
}

function keyBoard(e) {
    e.preventDefault();
    if (e.key >=0 && e.key <= 9){
        clickedNumber(e.key);
    } 
    if (e.key ==='Enter'||e.key === '=' && inputTwo != '' && inputOne!=''){
        operate();
    }
    if (e.key ==='+'||e.key === '-'){
        display(e.key);
    }
   // if (e.key ==='*'){
   //     display(×);
   // }
   // if (e.key ==='/'){
   //     display(÷);
   // }
    if (e.key === '.'){
        addDecimal();
    }
    if (e.key==='Backspace'){
        deleteNumber();
    }
}

function deleteNumber(){
    if (inputTwo != ''){
        inputTwo = inputTwo.slice(0,-1);
        lineTwoText.textContent = inputTwo;
    }
    if (inputTwo === '' && inputOne!=='' && operator===''){
        inputOne = inputOne.slice(0,-1);
        lineTwoText.textContent = inputOne;
    }
}
