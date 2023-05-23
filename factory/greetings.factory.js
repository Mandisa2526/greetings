function greetingsFactory(){
    var message = "";
    var error = ""
    
    function greet(name, language){
        error = '';
        if(!name){
            error += 'Enter your name!'
        } 
        if (!language) {
            error +=  "Please select the language!";
        }
        if (error === "") {
            name = name.toUpperCase();
            if (localStorage.getItem(name) === undefined){
                localStorage.setItem(name, 1);
            } else {
                var count = localStorage.getItem(name);
                localStorage.setItem(name, count++);
            }
    
            if (language === "English"){
                message = "Hello," + " " + name + "!";
            } else if(language === "Afrikaans"){
                message = "Hallo, " + name + "!";
            } else if(language === "isiZulu"){ 
                message = "Sawubona, " + name + '!';  
            } else {
                message = "";
            }
        }

    }

    function getNameCount() {
        return localStorage.length;
    }

    function reset() {
        localStorage.clear();
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
    }
}
