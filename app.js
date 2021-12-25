/* find it on blockchain.info/address
The brain wallet of whyyoudbemurderd
addy : 1MC3gBYsYwQpiEf1LhyZSei3zBA1ETveiK
PrivateKey : Kx7sJES3PTHUqodQftQyb5gBmfXwRHkdrPRXwpfRRtGPPvjK1vg3
PrivateKey : L5nAy7eUzuTKo2jRTPJihtm9zsDakaTxU1YgUcY2cdFaeTycH1Zn

#### As far as Deprecation warnings go
node  --trace-deprecation app.js
go
complete shootscoots
(node:308387) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
    at showFlaggedDeprecation (buffer.js:194:11)
    at new Buffer (buffer.js:281:3)
    at /var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/app.js:29:17
    at Layer.handle [as handle_request] (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/layer.js:95:5)
    at next (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/layer.js:95:5)
    at /var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/index.js:341:12)
    at next (/var/www/wwwhtml/udemy/fftne/bmvx/Node-Btc-Wallet/node_modules/express/lib/router/index.js:275:10)

*/


var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended:true
}))
function brainWallet(uinput, callback){
    var input = new Buffer(uinput);
    var has = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(has);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    callback(pk,addy);

}
app.use(bodyparser.json());
// res.sendfile was deprecated in the video now have changed it to new one
app.set("view engine", "ejs");

app.get("/",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    // res.sendFile(__dirname+"/index.html");
    res.render("index"), {lastPrice:price};
});


request({
    url:"https://api.blockchain.info/stats",
    json: true
},function(error,response,body){
    console.log(body.market_price_usd);
    price = body.market_price_usd
})


app.post("/wallet",function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log("complete "+ brainsrc);
    
    brainWallet(brainsrc, function(private,address){
        res.send("The brain wallet of "+ brainsrc + "<br> addy : "+ address + "<br> PrivateKey : " + private);
    });

});

app.listen(8080,function(){
    console.log("go");

});
