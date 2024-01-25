var bitcore = require("bitcore-lib");
var value = new Buffer.from("This is a way to generate an addresss from a sentence");
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var privateKey = new  bitcore.PrivateKey(bn,"testnet");
var address = new  bitcore.PrivateKey(bn,"testnet").toAddress();

console.log("address "+ address);

var value1 = new Buffer.from("This is a dangerous way to generate an addresss from a sentence");
var hash1 = bitcore.crypto.Hash.sha256(value1);
var bn1 = bitcore.crypto.BN.fromBuffer(hash1);
var privateKey1 = new  bitcore.PrivateKey(bn1,"testnet");
var address1 = new  bitcore.PrivateKey(bn1,"testnet").toAddress();

console.log("address1 "+ address1);