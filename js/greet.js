//reference dom elements
let inputElement = document.querySelector("input");
let greetingsBtnElement = document.querySelector("button");
let greetMessageElement = document.querySelector("greet");

function greetBtn(){
   
  greetMessageElement.textContent = 'hello, ${inputElement.value}!'
}
greetingsBtnElement.addEventListener('click',greetBtn);