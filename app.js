/* find it on blockchain.info/address
The brain wallet of fucks fuart
addy : 142HFXWyiPdWrhHxMTxiGMqmSst7vTKvY5
PrivateKey : L4nRhavK3R7iXhfn44fbauFEVeJhhP5vzgioeDAPsXMdeoKYZt2f

The brain wallet of thaeyd
addy : 1BichBfmgCQvWfjYZoUAsRpQDFdt8Kq85q
PrivateKey : KzkkvsNnWnWu2GLxJZdNR7qm3wVwLYDErqF35BkuAkrAYZtHvKKR

The brain wallet of shootscoots
addy : 13HLzC5Jqwko5dHuY3fhEuJTrpZQLuiyYH
PrivateKey : Ky2AqWJaCQrnYxHRGeyWxGadTjJP6dLfHqskZixmJYDBTRFXtArn

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

app.use(bodyparser.json());
// res.sendfile was deprecated in the video now have changed it to new one
app.get("/",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    res.sendFile(__dirname+"/index.html");
});


app.post("/wallet",function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log("complete "+ brainsrc);
    var input = new Buffer(brainsrc);
    var has = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(has);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();



    res.send("The brain wallet of "+ brainsrc + "<br> addy : "+ addy + "<br> PrivateKey : " + pk);
});

app.listen(8080,function(){
    console.log("go");

});
