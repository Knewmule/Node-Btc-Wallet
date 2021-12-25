var http = require("http");
var request = require("request");
http.createServer(function(req,res){
    request({
        url:"https://api.blockchain.info/stats",
        json:true
    },function(error, response, body){
        console.log(error);
        if(error){
            console.log("error :"+ error);
        }
        console.log(body);
        console.log(body.market_price_usd);

    })
    console.log("hi I am a new bitcoin walet guys");
    res.end("bitcoin to the moon");
}).listen(8080);