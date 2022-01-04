

var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended:true
}))
function brainWallet(uinput, callback){
    var input = new Buffer.from(uinput);
    var has = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(has);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    callback(pk,addy);

}
app.use(bodyparser.json());
// res.sendfile was deprecated in the video now have changed it to new one
// app.set("view engine", "ejs");
app.set('view engine', 'ejs');
// this allows you to render .html files as templates in addition to .ejs
app.engine('html', require('ejs').renderFile);

request({
    url:"https://api.blockchain.info/stats",
    json: true
},function(error,response,body){
    console.log(body.market_price_usd);
    price = body.market_price_usd
})

app.get("/",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    // res.sendFile(__dirname+"/index.html");
    res.render("index", {lastPrice:price});
});
app.get("/brain",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    // res.sendFile(__dirname+"/index.html");
    res.render("brain", {lastPrice:price});
});
app.get("/converter",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    // res.sendFile(__dirname+"/index.html");
    res.render("converter", {lastPrice:price, balance:0,totalReceived:0, totalSent:0});
});

app.get("/walletInfo",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    // res.sendFile(__dirname+"/index.html");
    res.render("walletInfo", {lastPrice:price,balance:0,totalReceived:0, totalSent:0});
});



app.post("/walletInfo",function(req,res){
    var account = req.body.account;
    console.log("complete "+ account);
    

    request({
        url:"https://blockchain.info/rawaddr/"+account,
        json: true
    },function(error,response,body){
        res.render("walletInfo", {lastPrice:price,balance:body.final_balance,
            totalReceived:response.body.total_received, totalSent:response.body.total_sent});
    })

});

app.post("/wallet",function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log("complete "+ brainsrc);
    

        brainWallet(brainsrc, function(private,address){
            res.send("The brain wallet of "+ brainsrc + "<br> addy : "+ address + "<br> PrivateKey : " + private);
        })
    

});

app.listen(8080,function(){
    console.log("go");

});
