//Get Rest API to send money to user and send back their balance

const express = require('express');
const app = express();
var cors = require('cors');
var value="nothing";
require("dotenv").config();


const { Client, CryptoTransferTransaction, AccountBalanceQuery  } = require("@hashgraph/sdk");

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/', (req, res) => {
    console.log("hi")
    mainRun(req)
    console.log("bye")
    res.send(value);
   });

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});


// create a new asynchronous function to tranfer money and send back balance

async function mainRun(idThing) {
    const operatorAccount = "0.0.68350";
    
    const operatorPrivateKey = "302e020100300506032b657004220420b9cdcce9a18bcefa21f332a968ffec63c0d727f318c474763420e3f7bbf02e97";
        
    const client = Client.forTestnet();
    
    client.setOperator(operatorAccount, operatorPrivateKey);
    

    /* send our first hbar transfer! */
    const balance = await new AccountBalanceQuery()
    .setAccountId(operatorAccount)
    .execute(client);
    
    //Get balance
    console.log(`${operatorAccount} balance = ${balance.asTinybar()}`);
    value = `${balance.asTinybar()}`;
    console.log(value)
    const transactionId = await new CryptoTransferTransaction()
    
    .addSender(operatorAccount, 100000000)
    
    .addRecipient(idThing, 100000000)
    
    .setTransactionMemo("Thank You For Completing the Challenge!")
    
    .execute(client);
    
    /* get the receipt of this transfer */
    const receipt = await transactionId.getReceipt(client);
    console.log(receipt);
    }