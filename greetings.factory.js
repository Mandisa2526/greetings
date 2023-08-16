export default function GreetingsFactory() {
    var message = "";
    var error = "";
    var message2 = "";
    var namesGreeted = {};
    var greetingsCounter = 0

    function greet(name, language) {
        error = '';
        if (!name) {
            error += 'Enter your name!';
        }
        if (!language) {
            error += "Please select the language!";
        }

        //when the greet button is pressed check if this user was already greeted before
        //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
        if (namesGreeted[name] === undefined) {
            greetingsCounter++;
            //add an entry for the user that was greeted in the Object Map
            namesGreeted[name] = 1;
        } else {
            // update the counter for a specific username
            namesGreeted[name]++;
        }


        if (error === "") {
            name = name.toUpperCase();
            if (language === "English") {
                message = "Hello," + " " + name + "!";
            } else if (language === "Afrikaans") {
                message = "Hallo, " + name + "!";
            } else if (language === "isiZulu") {
                message = "Sawubona, " + name + '!';
            } else {
                message = "";
            }
        }

    }

    function getNameCount() {

        return greetingsCounter;
    }

    function reset() {
        localStorage.clear()
        message2 = "Successfully cleared!";
    }

    function getResetMessage() {
        return message2;
    }


    function getMessage() {
        return message;
    }



    function getError() {
        return error;
    }

    return {
        greet,
        reset,
        getMessage,
        getError,
        getNameCount,
        getResetMessage,
    }
}
