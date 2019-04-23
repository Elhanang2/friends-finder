
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

        //this object is created to hold best match
       var bestMatch = {
        name:"",
        photo:"",
        friendDifference: Infinity
      }
        //user input captured
        var userInput = req.body;
        //Assign score  to anew variable
        var userInputScores = userInput.scores;
       

       var totalDifference;
        
        
        // for loop to get all friends score sum and to calculate the difference 
        for(var i = 0; i < friends.length; i++){
            var  currentFriend=friends[i];
                totalDifference = 0;

            for(var j= 0; j < currentFriend.scores.length; j++){
                var currentFriendScore = currentFriend.scores[j]
                var currentUserScore = userInputScores[j]
                 totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
                
            }
                    //compare difference with initial value and assign to variales
                    if(totalDifference <= bestMatch.friendDifference){
                        bestMatch.name=currentFriend.name;
                        bestMatch.photo=currentFriend.photo;
                        bestMatch.friendDifference=totalDifference;
                    }
            
        }
        
        // Finally save the user's data to the database
        friends.push(userInput);
        // Return a JSON with the user's bestMatch.
        res.json(bestMatch); 
    });
};