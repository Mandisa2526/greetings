import assert from "assert";
import GreetingsFactory from '../greetings.factory.js';
import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionString = "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const db = pgp(connectionString);






describe('the greet factory function' , function(){
    describe('Greet in different languages' , function(){
        it('should be able to greet in "English' , function(){
            let greetDifferent = GreetingsFactory();
            greetDifferent.greet('Samu', "English")
            assert.equal('Hello, SAMU!', greetDifferent.getMessage());
    
        });
        it('should be able to greet in "Afrikaans"' , function(){
            let greetDifferent2 = GreetingsFactory();
            greetDifferent2.greet('Ntokozo', 'Afrikaans')
            assert.equal('Hallo, NTOKOZO!', greetDifferent2.getMessage());
            
        });
        it('should be able to greet in "isiZulu" ' , function(){
            let greetDifferent3 = GreetingsFactory();
            greetDifferent3.greet('Nhlosenhle', 'isiZulu')
            assert.equal('Sawubona, NHLOSENHLE!', greetDifferent3.getMessage());
        });
        
    
    });

    describe('Error Messages ' , function(){
        it('should be able to return an error message when the name is not entered and the language ' , function(){
            let greetDifferent4 = GreetingsFactory();
            greetDifferent4.greet("");

            assert.equal('Enter your name!Please select the language!', greetDifferent4.getError("",""));     
        });

        it('should be able to display an error message when the username is not passed' , function(){
            let greetDifferent4 = GreetingsFactory();
            greetDifferent4.greet("");

            greetDifferent4.greet("",'isiZulu')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'English')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'Afrikaans')
            assert.equal('Enter your name!', greetDifferent4.getError());
        });   
        it('should be able to return an error message when the language is not selected' , function(){
            let greetDifferent4 = GreetingsFactory();
            greetDifferent4.greet("Mandisa");
            greetDifferent4.greet("Mandisa","")
            assert.equal('Please select the language!', greetDifferent4.getError());     
        });     
    });    


});


describe('The basic database web app', function(){


    beforeEach(async function(){
    });
    it("should able to insert user names", async function () {

        let greetingsFactory = GreetingsFactory();

        await greetingsFactory.greet("Mandisa");

    });

    after(function(){
        db.$pool.end
    });
});