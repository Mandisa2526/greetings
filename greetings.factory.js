export default function GreetingsFactory() {
    var message = "";
    var error = "";
    var message2 = "";
    var namesGreeted = {};

    function greet(name, language) {
        error = '';
        if (!name) {
            error += 'Enter your name!';
        }
        if (!language) {
            error += "Please select the language!";
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

            //when the greet button is pressed check if this user was already greeted before
            //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
            if (namesGreeted[name] === undefined) {
                //add an entry for the user that was greeted in the Object Map
                namesGreeted[name] = 1;
            } else {
                // update the counter for a specific username
                namesGreeted[name]++;
            }
        } else {
            message = "";
        }

    }

    function getNameCount() {
        return Object.keys(namesGreeted).length
    }

    function getNamesGreeted() {
        let names = [];
        Object.keys(namesGreeted).forEach(key => {
            names.push({
                name: key,
            })
        });
        return names;
    }

    function getGreetedCount(name){
      return namesGreeted[name];
    }

    function reset() {
        namesGreeted = {};
        //message2 = "Successfully cleared!";
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
        getNamesGreeted,
        getGreetedCount
    }
}
