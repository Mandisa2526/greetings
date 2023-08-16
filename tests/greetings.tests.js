describe('the greet factory function' , function(){
    describe('Greet in different languages' , function(){
        it('should be able to greet in "English' , function(){
            let greetDifferent = greetingsFactory();
            greetDifferent.greet('Samu', "English")
            assert.equal('Hello, SAMU!', greetDifferent.getMessage());
    
        });
        it('should be able to greet in "Afrikaans"' , function(){
            let greetDifferent2 = greetingsFactory();
            greetDifferent2.greet('Ntokozo', 'Afrikaans')
            assert.equal('Hallo, NTOKOZO!', greetDifferent2.getMessage());
            
        });
        it('should be able to greet in "isiZulu" ' , function(){
            let greetDifferent3 = greetingsFactory();
            greetDifferent3.greet('Nhlosenhle', 'isiZulu')
            assert.equal('Sawubona, NHLOSENHLE!', greetDifferent3.getMessage());
        });
        
    
    });

    describe('Error Messages ' , function(){
        it('should be able to return an error message when the name is not entered and the language ' , function(){
            let greetDifferent4 = greetingsFactory();
            greetDifferent4.greet("");

            assert.equal('Enter your name!Please select the language!', greetDifferent4.getError("",""));     
        });

        it('should be able to display an error message when the username is not passed' , function(){
            let greetDifferent4 = greetingsFactory();
            greetDifferent4.greet("");

            greetDifferent4.greet("",'isiZulu')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'English')
            assert.equal('Enter your name!', greetDifferent4.getError());
            greetDifferent4.greet("",'Afrikaans')
            assert.equal('Enter your name!', greetDifferent4.getError());
        });   
        it('should be able to return an error message when the language is not selected' , function(){
            let greetDifferent4 = greetingsFactory();
            greetDifferent4.greet("Mandisa");
            greetDifferent4.greet("Mandisa","")
            assert.equal('Please select the language!', greetDifferent4.getError());     
        });     
    });    

    describe('Counter' , function(){
        it('should be able to count names entered' , function(){
            var namesCounts = greetingsFactory();
           
            namesCounts.greet('Sammy');
            namesCounts.greet('Mandisa');
            namesCounts.greet('Mandisa');

            assert.equal(3, namesCounts.getNameCount());
        });

        it("should  not count when the name has been passed multiple times" , function(){
            var namesCounts = greetingsFactory();
            namesCounts.greet('Nobuhle');
            namesCounts.greet('Nobuhle');
            namesCounts.greet('Sammy');
            namesCounts.greet('Sammy');
            namesCounts.greet('Mpatho');
            namesCounts.greet('Mpatho');

            assert.equal(3, namesCounts.getNameCount(''));
        });
        
        it("should be able to store the usernames passed" , function(){
            var namesCounts = greetingsFactory();
            namesCounts.reset();
            namesCounts.getNameCount();
            namesCounts.greet('Mpatho');
            namesCounts.greet('Sammy');
        
            assert.equal(0, namesCounts.getNameCount());
        });
 
    });
    describe('Reset Button' , function(){
        
        it("should be able to reset the counter to zero" , function(){
            var namesCounts = greetingsFactory();
            namesCounts.reset();
            namesCounts.greet('Nobuhle');
            namesCounts.greet('Mpatho');
            namesCounts.greet('Sammy');
        
            assert.equal(0, namesCounts.getNameCount());
        });
        

    });
    
    

});