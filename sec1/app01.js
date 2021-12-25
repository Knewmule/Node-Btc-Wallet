var express = require("express");
var app = express();
var request = require("request");

request({
    url:"https://api.blockchain.info/stats",
    json:true
}, function(error, response,body){
    btcPrice = body.market_price_usd;
    btcBlock = body.blocks_size;
})

app.get("/",function(req,res){
    res.send("Bitcoin to the moon "+ btcPrice);

});

// res.sendfile was deprecated in the video now have changed it to new one
app.get("/block",function(req,res){
    // res.send("Current blocks "+ btcBlock);
    res.sendFile(__dirname+"/index.html");
});

app.listen(8080,function(){
    console.log("go");

});
