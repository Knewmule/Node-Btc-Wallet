// delete global._bitcore;
// declare module 'bitcore-explorers';
var bitcore = require("bitcore-lib");
var Insight = require('bitcore-explorers');
// if (global._bitcore) delete global._bitcore;
// type valFromBuffer = (a: string) => void;
// function buffer(a:string):Buffer {
//   return Buffer.from(a);
// }
var value = Buffer.from("This is a way to generate an addresss from a sentence");
// var value = buffer("This is a way to generate an addresss from a sentence");
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var privateKey = new  bitcore.PrivateKey(bn,"testnet");
var address = new  bitcore.PrivateKey(bn,"testnet").toAddress();

console.log("address "+ address);

var value1 =  Buffer.from("This is a dangerous way to generate an addresss from a sentence");
var hash1 = bitcore.crypto.Hash.sha256(value1);
var bn1 = bitcore.crypto.BN.fromBuffer(hash1);
var privateKey1 = new  bitcore.PrivateKey(bn1,"testnet");
var address1 = new  bitcore.PrivateKey(bn1,"testnet").toAddress();

console.log("address1 "+ address1);

// type testNet = (a: string) => typeof Insight;
// function testnet(a:string):typeof Insight {
//   return  Insight(a);
// }
var insight: typeof Insight.testnet;
insight.getUnspentUtxos(address,function(err:any,utxos:any){
    if(err){
        console.log('error : ' + err);
    }else{
        console.log('utxos : ' + utxos);
        var tx = bitcore.Transaction();
        tx.from(utxos);
        tx.to(address1,10000);
        tx.change(address);
        tx.fee(50000);
        tx.sign(privateKey);
        tx.serialize();

        insight.broadcast(tx.toString(), function(error:any, returnedTxId:any){
            if(error){
                console.log('error : ' + error);
            }else{
                console.log('returnedTxId : ' + returnedTxId);
            }
        });
    }
})