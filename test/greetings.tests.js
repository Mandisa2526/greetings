import assert from "assert";
import GreetingsFactory from '../greetings.factory.js';
import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionString = "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const db = pgp(connectionString);

describe('the greet factory function' , function(){
    describe('Greet in different languages' , function(){
        it('should be able to greet in "English' , async function(){
            try {
            let greetDifferent = GreetingsFactory(db);
            greetDifferent.greet('Samu', "English")
            let result = greetDifferent.getMessage();
            assert.equal('Hello, SAMU!', result);
            } catch(err) {}
        });
        it('should be able to greet in "Afrikaans"' , async function(){
            let greetDifferent2 = GreetingsFactory(db);
            greetDifferent2.greet('Ntokozo', 'Afrikaans')
            assert.equal('Hallo, NTOKOZO!', await greetDifferent2.getMessage()); 
        });
        it('should be able to greet in "isiZulu" ' , function(){
            let greetDifferent3 = GreetingsFactory(db);
            greetDifferent3.greet('Nhlosenhle', 'isiZulu')
            assert.equal('Sawubona, NHLOSENHLE!', greetDifferent3.getMessage());
        });
        
    
    });

    describe('Error Messages ' , function(){
        it('should be able to return an error message when the name is not entered and the language ' , function(){
            let greetDifferent4 = GreetingsFactory(db);
            greetDifferent4.greet("");

            assert.equal('Enter your name!Please select the language!', greetDifferent4.getError("",""));     
        });

        it('should be able to display an error message when the username is not passed' , function(){
            let greetDifferent4 = GreetingsFactory(db);
            greetDifferent4.greet("");

            greetDifferent4.greet("",'isiZulu')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'English')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'Afrikaans')
            assert.equal('Enter your name!', greetDifferent4.getError());
        });   
        it('should be able to return an error message when the language is not selected' , function(){
            let greetDifferent4 = GreetingsFactory(db);
            greetDifferent4.greet("Mandisa");
            greetDifferent4.greet("Mandisa","")
            assert.equal('Please select the language!', greetDifferent4.getError());     
        });     
    });    

    after(function () {
        db.$pool.end;
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