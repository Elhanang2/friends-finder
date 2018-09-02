//Dependencies
var path = require("path");
var friends = require("../data/friends.js");
//Routes
module.exports = function(app){
    //Get frends list
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });
    //Add friend
    app.post("/api/friends", function(req, res){
        //user input captured
        var userinput = req.body;
        console.log("user input : "+ JSON.stringify(userinput.scores)); 
        //variable declaration and initialization
        var friendsMatchName="";
        var friendsMatchImage="";

        //Assign score  to anew variable
        var userinputscore = userinput.scores;
        //change  string to number
        userinputscore = userinputscore.map(Number);
        //Add scores of the user input to compare from the rest of scores stored 
        var userinputTotalscore = userinputscore.reduce(function(a,b){  return a+b; },0);
        
        console.log("userinputscore ="+userinputTotalscore);
        //Give initial difference values for starting to compare
        var totaldifference=100;
        // for loop to get all friends score sum and to calculate the difference 
        for(var i=0; i < friends.length; i++){
            var  friendsscore=friends[i].scores;
            //change  string to number
            friendsscore = friendsscore.map(Number);

        var friendsTotalScore = friendsscore.reduce(function(a,b){  return a+b; },0);
            //absolute value of difference 
            var diff =Math.abs(friendsTotalScore-userinputTotalscore);
            console.log("diff : "+diff);
                //compare difference with initial value and assign to variavles
                if(diff < totaldifference){
                    totaldifference=diff;
                    friendsMatchName=friends[i].name;
                    friendsMatchImage=friends[i].photo;
                }
        }
        console.log("friendsMatchName:"+friendsMatchName);
        console.log("friendsMatchImage: "+friendsMatchImage);
        friends.push(userinput);
        res.json({friendsMatchName:friendsMatchName,
                friendsMatchImage:friendsMatchImage}); 
    });
};