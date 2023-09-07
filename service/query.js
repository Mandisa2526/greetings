export default function Query(db){

    async function fetchCountUserByName(name) {

        let result = await db.any(`SELECT user_count FROM users WHERE user_name = '${name}'`);
       
        return result[0].user_count;
        
    }
    
    async function inserTable(name){

       
        await db.none(`INSERT INTO users(user_count, user_name) VALUES (1, '${name}')`);
        
    }  
    async function countAll(){

        let result = await db.oneOrNone("SELECT count(DISTINCT user_name) FROM users;");

        return result
    }
   
    async function selectNames(){
        let names = await db.any('SELECT Distinct user_name  FROM users;');
        return names; 
    }
    
    async function userAndCount(name){
        let namesGreeted = await  db.oneOrNone(`SELECT SUM(user_count) FROM users WHERE user_name  = $1`,[name]);
        return namesGreeted; 

    }
    
    async function deleteAllUsers(){
        
       await db.none('DELETE FROM users');

    }

    return{
       inserTable,
       deleteAllUsers,
       userAndCount,
       selectNames,
       countAll,
       fetchCountUserByName
    }
}