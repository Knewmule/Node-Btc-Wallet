var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");

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
    res.send("complete "+ brainsrc);
});

app.listen(8080,function(){
    console.log("go");

});
