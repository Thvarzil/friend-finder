// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function getSites(app) {
    var friendsArr = require("../data/friends");

// Sets up the Express app to handle data parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Basic route that sends the user first to the AJAX Page


    app.get("/api/friends", function (req, res) {
            res.json(friendsArr);
    });
    app.get("/api/survey", function (req, res) {
        res.json(friendsArr);
    });

    app.post("/api/friends", function (req, res) {

        var newUserScoreArr = req.body.scores;


        var bestMatch = 0;
        var scoreCompareArr = [];

        for (var i = 0; i < friendsArr.length; i++) {

            var scoresDiff = 0;

            for (var j = 0; j < newUserScoreArr.length; j++) {

                scoresDiff += parseInt(friendsArr[i].scores[j]) - parseInt(newUserScoreArr[j]);

            }
            scoreCompareArr.push(scoresDiff);

        }

        //after all friends are compared, find best match
        for (i = 0; i < scoreCompareArr.length; i++) {
            if (scoreCompareArr[i] <= scoreCompareArr[bestMatch]) {
                bestMatch = i;

            }
        }
        console.log("this is your best match: " + bestMatch);


        //return bestMatch data
        var bff = friendsArr[bestMatch];

        console.log(bff.image + " name " + bff.name);
        res.json(bff);


        //pushes new submission into the friendsList array
        friendsArr.push(req.body);


    });

    console.log("I am doing stuff");

};