function greetings(){
    const namesCount = {};
    var greetTotalCount = 0;

    function enter(Name){
        
        if (namesCount[Name] === undefined){
            greetTotalCount++;
            //add an entry for the user that was greeted in the Object Map
            namesCount[Name] = 1;
        } else {
            // update the counter for a specific username
            namesCount[Name]++;
        }
    };
    
    
        if(namesCount[Name] === "English"){
            return "hello,"  + " " + Name + "!";
    
        }
        function getGreetedAfrikaans(Name){
            return "hallo,"  + " " + Name + "!";
    
        }
        function getGreetedZulu(Name){
            return "Sawubona,"  + " " + Name + "!";
    
        }

    
     function reset(){
        if(greetTotalCount > 0){
            return greetTotalCount;
        }
    }

    return {
        //getGreetedEnglish,
        enter,
        getGreetedAfrikaans,
        getGreetedZulu,
        reset
        
    }
}
