//reference dom elements
let inputElement = document.querySelector(".input");
let greetingsBtnElement = document.querySelector(".button");
let greetMessageElement = document.querySelector(".greet");
//let countTotalElem = document.querySelector(".countNames");
let resetBtnElement = document.querySelector(".resetButton");
let greetRadioElement = document.querySelector(".englishItemTypeRadio");
let greetingsTotalElement = document.querySelector(".countNames");
let errorMessageElem = document.querySelector(".error");

var greetCount = localStorage.getItem('greetCount') ?? 0;  


var greetObject = greetingsFactory();

function greetBtn(){
    var checkedRadioGreet = document.querySelector("input[name='billItemType']:checked");
    var nameType = '';
    if (checkedRadioGreet) {
        nameType = checkedRadioGreet.value;
        checkedRadioGreet.checked = false;
    }
    var typename = ''; 
    if (inputElement.value) {
        typename = inputElement.value;
        inputElement.value = "";
    } 
    greetObject.greet(typename, nameType);
    greetingsTotalElement.innerHTML = greetObject.getNameCount();
    greetMessageElement.innerHTML = greetObject.getMessage();
    setTimeout(function(){greetMessageElement.innerHTML = "";},5000);
    errorMessageElem.innerHTML = greetObject.getError();
    setTimeout(function(){errorMessageElem.innerHTML = "";},3000);

    
}
greetingsBtnElement.addEventListener('click',greetBtn);

function reset() {
    greetCount= 0;
   
    greetingsTotalElement.innerHTML = greetCount;
}
resetBtnElement.addEventListener('click',reset);