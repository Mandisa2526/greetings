import assert from "assert";
import GreetingsFactory from '../greetings.factory.js';
import pgPromise from 'pg-promise';
import Query from '../service/query.js';

const pgp = pgPromise();

const connectionString = "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const db = pgp(connectionString);

let database = Query(db);

describe('the greet factory function' , function(){
    describe('Greet in different languages' , function(){
    
        it('should be able to greet in "English' , function(){
            let greetDifferent = GreetingsFactory();
            greetDifferent.setUserName("Mandisa");
            greetDifferent.setLanguage("English");

            let result = greetDifferent.getGreet();

            assert.equal('Hello, Mandisa', result);
           
        });
        it('should be able to greet in "Afrikaans"' , async function(){
            let greetDifferent = GreetingsFactory();

            greetDifferent.setUserName("Mandisa");
            greetDifferent.setLanguage("Afrikaans")

            let result = greetDifferent.getGreet();

            assert.equal('Hallo, Mandisa', result);
        });
        it('should be able to greet in "isiZulu" ' , function(){
            let greetDifferent = GreetingsFactory();
            greetDifferent.setUserName("Mandisa");
            greetDifferent.setLanguage("isiZulu")

            let result = greetDifferent.getGreet();

            assert.equal('Sawubona, Mandisa', result);
        });
        
    
    });

    describe('Error Messages ' , function(){
        it('should be able to return an error message when the name is not entered and the language ' , function(){
            let greetDifferent4 = GreetingsFactory();

            greetDifferent4.setUserName("");
            greetDifferent4.setLanguage("");

            assert.equal('Please enter name and language! ' == '', greetDifferent4.getError());     
        });

        it('should be able to display an error message when the username is not passed' , function(){
            let greetDifferent4 = GreetingsFactory(db);
            greetDifferent4.setUserName("");

            greetDifferent4.getGreet("",'isiZulu')

            assert.equal('Please enter name! ' == '', greetDifferent4.getError());
            greetDifferent4.getGreet("",'English')

            assert.equal('Please enter name! ' == '', greetDifferent4.getError());
            greetDifferent4.getGreet("",'Afrikaans')

            assert.equal('Please enter name! ' == '', greetDifferent4.getError());
        });   
        it('should be able to return an error message when the language is not selected' , function(){
            let greetDifferent4 = GreetingsFactory();

            greetDifferent4.setUserName("Mandisa");
            greetDifferent4.setLanguage("Mandisa","")

            assert.equal('Please select the language! ' == '', greetDifferent4.getError());     
        });     
    });    

    after(function () {
        db.$pool.end;
    });
});


describe('The basic database web app', function(){
    // beforeEach(async function(){
    //     // clean the tables before each test run
    //     await db.none("delete from users;");
       
    // });

    it("should able to insert user names", async function () {
        this.timeout(10000);
        let database = Query(db);

        await database.inserTable("Mandisa");

    });
    it('should test reset button', async function () {
        this.timeout(10000); // Set a longer timeout for this test

        let database =  Query(db);
        // Insert some test data before testing reset
        await database.inserTable('user1');
        await database.inserTable('user2');
    
        // Reset the database 
        await database.deleteAllUsers();
    
        const users = await database.selectNames(); 
        assert.equal(users.length, 0);
      });
      it('should test countGreetedUsers function', async function () {
        this.timeout(10000); // Set a longer timeout for this test

        let database =  Query(db);
        // Insert test data before testing
        await database.inserTable('user1');
        await database.inserTable('user2');
        await database.inserTable('user2'); 
    
        
        const userCounter = await database.userAndCount('user2');
        assert.equal(userCounter.sum, 2);
      })


    
    

    after(function(){
        db.$pool.end
    });
});