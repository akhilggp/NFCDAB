'use strict';
const { Contract} = require('fabric-contract-api');

class testContract extends Contract {

   async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const certs = [
            {
                name: 'akhil',
                
                certif: '12314123413',
            },
	];
for (let i = 0; i < certs.length; i++) {
            certs[i].docType = 'certifs';
            await ctx.stub.putState('Data' + i, Buffer.from(JSON.stringify(certs[i])));
            console.info('Added <--> ', certs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }



   async query(ctx,name) {
   
    let dataAsBytes = await ctx.stub.getState(name); 
    if (!dataAsBytes || dataAsBytes.toString().length <= 0) {
      throw new Error('Student with this Id does not exist: ');
       }
      let data=JSON.parse(dataAsBytes.toString());
      
      return JSON.stringify(data);
     }

   async add(ctx,name,image) {
   
    let data={
       certif:image
       };

    await ctx.stub.putState(name,Buffer.from(JSON.stringify(data))); 
    
    console.log('Certif added To the ledger Succesfully..');
    
  }

   async deleteMarks(ctx,name) {
   

    await ctx.stub.deleteState(name); 
    
    console.log('Certif deleted from the ledger Succesfully..');
    
    }
}

module.exports=testContract;
