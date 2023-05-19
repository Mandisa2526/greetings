//reference dom elements
let inputElement = document.querySelector(".input");
let greetingsBtnElement = document.querySelector(".button");
let greetMessageElement = document.querySelector(".greet");
//let countTotalElem = document.querySelector(".countNames");
let resetBtnElement = document.querySelector(".resetButton");
let greetRadioElement = document.querySelector(".englishItemTypeRadio");
let greetingsTotalElement = document.querySelector(".countNames");
let errorMessageElem = document.querySelector(".error")

var greetCount = 0;
var namesGreeted = {};

function greetBtn(){
    var checkedRadioGreet = document.querySelector("input[name='billItemType']:checked");
    
    if(checkedRadioGreet && inputElement.value){
        var nameType = checkedRadioGreet.value;
        var typename = inputElement.value;
        var username = typename.toUpperCase();
        inputElement.value = "";
        errorMessageElem.innerHTML = "";


        if(nameType === "English"){
           //var message = 'Hello,';
           greetMessageElement.innerHTML = "Hello," + " " + username + "!";

          //    greetCount++;
         //    localStorage['entered'] = greetCount;
          //    greetingsTotalElement.innerHTML = greetCount;
           
        } 
        if(nameType === "Afrikaans"){
          var languageAfrikaans = "Hallo,";
          greetMessageElement.innerHTML = languageAfrikaans + " " + username + "!";

          //   greetCount++;
          //   localStorage['entered'] = greetCount;
          //   greetingsTotalElement.innerHTML = greetCount;
      
        }
        if(nameType === "isiZulu"){
           var zuluLanguage = "Sawubona,"
           greetMessageElement.innerHTML = zuluLanguage + " " + username + '!';

          //  greetCount++;
          //  localStorage['entered'] = greetCount;
          //  greetingsTotalElement.innerHTML = greetCount;
        }

        if (namesGreeted[username] === undefined){
            greetCount++;
            //add an entry for the user that was greeted in the Object Map
            namesGreeted[username] = 1;
        } else {
            // update the counter for a specific username
            namesGreeted[username]++;
        }
        //update the DOM to display the counter
        greetingsTotalElement.innerHTML = greetCount;

               
    } else if(inputElement.value) {
       errorMessageElem.innerHTML =  "Please select the language!";
    } else {
        errorMessageElem.innerHTML = "Enter your name!"
    }


    
}
greetingsBtnElement.addEventListener('click',greetBtn);

function reset() {
    greetCount= 0;
    greetingsTotalElement.innerHTML = greetCount;
}
resetBtnElement.addEventListener('click',reset);