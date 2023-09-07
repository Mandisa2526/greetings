
 export default function GreetingsFactory() {
    var userInput = "";
    var errorMessage = "";
    var languageSelected = '';
    var letters = /^[A-Za-z]+$/;
    var successMessage;

    function getSuccessMessage(){
        let message = successMessage;
        successMessage = '';
        return message;
    }

    function setLanguage(language) {
        if (language === "English") {
            languageSelected = "Hello"
        } else if (language === "Afrikaans") {
            languageSelected = "Hallo"
        } else if (language === "isiZulu") {
            languageSelected = "Sawubona"
        }
    }

    function setError(name, language) {
        if (!name && !language) {
            errorMessage = "Please enter name and language! ";
        } else if (!name) {
            errorMessage = "Please enter name! ";
        } else if(!name.match(letters)){
            errorMessage = "Invalid name!";
        } else if (!language) {
            errorMessage = "Please select the language! ";
        } else {
            errorMessage = undefined;
        }
    }

    function setUserName(name) {
        if (name && name.match(letters)) {
            userInput = name;
        } else {
            userInput = undefined
        }

    }

    function getGreet() {
        if (userInput && languageSelected) {
            return `${languageSelected}, ${userInput}`;
        }
    }

    function getError() {
        return errorMessage;
    }
    function reset(){
        successMessage = 'Successfully Cleared'
        userInput = "";
        errorMessage = "";
        languageSelected = '';
    }

    return {
        setLanguage,
        getError,
        setError,
        getGreet,
        setUserName,
        reset,
        getSuccessMessage
    }
}

