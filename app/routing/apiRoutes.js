
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
var friends = require("../data/friends.js");
//Routing
module.exports = function(app){
    //API Get Request 
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });
    //API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    //Add friend
    app.post("/api/friends", function(req, res){
        //user input captured
        var userinput = req.body;
        console.log("userinput: "+ userinput);
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
                //compare difference with initial value and assign to variales
                if(diff < totaldifference){
                    totaldifference=diff;
                    friendsMatchName=friends[i].name;
                    friendsMatchImage=friends[i].photo;
                }
        }
        console.log("friendsMatchName:"+friendsMatchName);
        console.log("friendsMatchImage: "+friendsMatchImage);
        // Finally save the user's data to the database
        friends.push(userinput);
        // Return a JSON with the user's bestMatch.
        res.json({friendsMatchName:friendsMatchName,
                friendsMatchImage:friendsMatchImage}); 
    });
};