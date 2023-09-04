import assert from 'assert';
import GreetingsFactory from '../greetings.factory.js';
import pgp from 'pg-promise';

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:3002/database.tests.js';

const db = pgp(connectionString);

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await db.none("delete from users;");
        //await db.none("delete from categories;");
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let greetingsFactory = GreetingsFactory(db);
        await greetingsFactory.add({
            description : "Diary"
        });

        let greetings = await GreetingsFactory.all();
        assert.equal(1, greetings.length);

    });

    after(function(){
        db.$pool.end
    })
});