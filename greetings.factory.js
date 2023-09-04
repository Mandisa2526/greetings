
async function fetchCountUserByName(db, name) {
    let result = await db.any(`SELECT user_count FROM users WHERE user_name = '${name}'`);
    console.log(result);
    if (result.length == 0) {
        return undefined;
    } else {
        return result[0].user_count
    }
}

export default function GreetingsFactory(db) {
    var message = "";
    var error = "";
    var message2 = "";
    var namesGreeted = {};

    async function greet(name, language) {
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
            let count = await fetchCountUserByName(db, name);
            if (count === undefined) {
                //add an entry for the user that was greeted in the Object Map
                await db.none(`INSERT INTO users(user_count, user_name) VALUES (1, '${name}')`);
            } else {
                // update the counter for a specific username
                await db.none(`UPDATE users SET user_count = '${count}' where user_name = '${name}'`);
            // update;
            }
        } else {
            message = "";
        }

    }

    async function getNameCount() {
        let result = await db.one("SELECT count(*) FROM users");
        return  result.count;
    }

    async function getNamesGreeted() {
        let names = await db.any('SELECT user_name FROM users');
        return names;
    }

    async function getGreetedCount(name){
        let namesGreeted = await  db.any(`SELECT user_count FROM users WHERE user_name = '${name}'`);
        if (namesGreeted.length == 0) {
            return 0
        }
        return namesGreeted[0].user_count;

    }

    function reset() {
       return db.none('DELETE FROM users WHERE 1=1');
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
