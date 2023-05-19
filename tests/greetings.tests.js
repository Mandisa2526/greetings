describe('the greet factory function' , function(){
    describe('Greet in different languages' , function(){
        it('should be able to greet in "English' , function(){
            let greetDifferent = greetings();

            greetDifferent.enter('Samu');
      
            assert.equal('hello, Samu!', greetDifferent.getGreetedEnglish('Samu'));
    
        });
        it('should be able to greet in "Afrikaans"' , function(){
            let greetDifferent2 = greetings();

            greetDifferent2.enter('Ntokozo');
      
            assert.equal('hallo, Ntokozo!', greetDifferent2.getGreetedAfrikaans('Ntokozo'));
            
        });
        it('should be able to greet in "isiZulu" ' , function(){
            let greetDifferent3 = greetings();

            greetDifferent3.enter('Nhlosenhle');
      
            assert.equal('Sawubona, Nhlosenhle!', greetDifferent3.getGreetedZulu('Nhlosenhle'));
    
        });
        
    
    });
    describe('Error Messages ' , function(){
        it('should be able to return an error message when the name is not entered' , function(){
           
            
        });
        it('should be able to display an error message when the language is not selected' , function(){
           
            
        });
        
        
        describe('Counter' , function(){
            it('should be able to count names entered' , function(){
               
            });
            it("should be able to stop the count when the name has been passed multiple times" , function(){
                
            });
            // it("should be able to reset the counter to zero" , function(){
            //     let greetDifferent4 = greetings();

            // });

            

            
             
        })
    
    
    });
    

});