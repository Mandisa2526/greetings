function greetings(){
    const namesCount = {};
    //var counterTotal = 0;

    function enter(Name){
        if (namesCount[Name] === undefined){
            namesCount[Name] = 0;
        }
        namesCount[Name] += 1;
    };
    
    function getGreetedEnglish(Name){
        return "hello,"  + " " + Name + "!";

    }
    function getGreetedAfrikaans(Name){
        return "hallo,"  + " " + Name + "!";

    }
    function getGreetedZulu(Name){
        return "Sawubona,"  + " " + Name + "!";

    }
    function erroM(){
       if(Name){
          
       }
    }
    // function reset(){
    //    return counterTotal;
    // }
    return {
        getGreetedEnglish,
        enter,
        getGreetedAfrikaans,
        getGreetedZulu,
        erroM,
        reset
        
    }
}
