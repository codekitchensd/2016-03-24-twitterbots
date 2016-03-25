// Base Node.js file. Contains all the bot functionality
// and uses the three packages below.
var tracery = require('tracery-grammar');
var moment = require('moment');
var Twit = require('twit');


// Using tracery we create 3 different grammar jsons.
// OLD, STRONG, and SPRY
var oldUserGrammar = 
{
	"origin": [
		", you are #adjective# like that of a #animal#!",
		" the #animal#, #adjective# like no other.",
	],
	"adjective": [
		"wise",
		"practiced",
		"seasoned",
		"skillful",
		"accomplished",
		"astute"
	],	
	"animal": [
		"African Elephant",
		"Bowhead Whale",
		"Galapagos Giant Tortoise",
		"Greenland Shark",
		"Koi Fish",
		"Long Finned Eel",
		"Macaw",
		"Ocean Quahog"
	]
}

var strongUserGrammar = 
{
	"origin": [
		", you are #adjective# like the mighty #animal#!",
		" the #animal#, #adjective# and above the rest.",
	],
	"adjective": [
		"strong",
		"powerful",
		"sturdy",
		"secure",
		"healthy",
		"robust"
	],		
	"animal": [
		"Eagle",
		"Anaconda",
		"Grizzly Bear",
		"Ox",
		"Tiger",
		"Gorilla",
		"Leafcutter Ant",
		"Rhinoceros Beetle"
	]
}

var spryUserGrammar = 
{
	"origin": [
		", you are a #adjective# #animal#, watch out!",
		" the #animal#, #adjective# and ready to go.",
	],
	"adjective": [
		"spry",
		"tenacious",
		"energetic",
		"spunky",
		"peppy",
		"adventurous"
	],	
	"animal": [
		"Bharal",
		"Hare",
		"Red Kangaroo",
		"Klipspringer",
		"Grasshopper",
		"Froghopper",
		"Jumping Spider",
		"Tree Frog"
	]
}

// Next we load the grammar jsons into tracery.
var oldProcessedGrammar = tracery.createGrammar(oldUserGrammar);
oldProcessedGrammar.addModifiers(tracery.baseEngModifiers);

var strongProcessedGrammar = tracery.createGrammar(strongUserGrammar);
strongProcessedGrammar.addModifiers(tracery.baseEngModifiers);

var spryProcessedGrammar = tracery.createGrammar(spryUserGrammar);
spryProcessedGrammar.addModifiers(tracery.baseEngModifiers); 

// Here are the three possible responses.
// when used, tracery will crunch a new sentence.
var oldResponse = function() {
	return oldProcessedGrammar.flatten("#origin#");
};

var strongResponse = function() {
	return strongProcessedGrammar.flatten("#origin#");
};

var spryResponse = function() {
	return spryProcessedGrammar.flatten("#origin#");
};


// Now we setup Twit which is a module to simplify using the twitter api.
var T = new Twit(
{
    consumer_key:         process.env.TWITTER_CONSUMER_KEY
  , consumer_secret:      process.env.TWITTER_CONSUMER_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}
);

// This creates a post on the account associated with the key above.
var tweetResponse = function(iScreenName, iResponse) {
	// combines the screenname with an '@' and the response.
	// then outputs the tweet that gets posted.
	T.post('statuses/update', { status: "@" + iScreenName + iResponse }, function(err, data, response) {
		if (err) {
			console.log(err);
		}

  		console.log(data.text);
	})
};

// Here we handle how we will respond to the hash tag mentioned.
var sendResponse = function(iTweet) {
	// First we parse the users account creation date with moment.js
	// we tell moment that it will be a specific format of a string
	// then we ask for only the year with '.format("YYYY")'
	var acctCreation = moment(iTweet.user.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('YYYY');

	// if the user has tweeted more than 1200 time we give the strong response.
	if (iTweet.user.statuses_count >= 1200) {
		tweetResponse( iTweet.user.screen_name, strongResponse() );

	// if the user's account was created before 2012 we give the old response.
	} else if (acctCreation <= 2012) {
		tweetResponse( iTweet.user.screen_name, oldResponse() );

	// Other wise we give the spry response.
	} else {
		tweetResponse( iTweet.user.screen_name, spryResponse() );
	}

}

// Regular Expression for finding re-tweets.
var rt = new RegExp("RT @");

// Here we start a tweeter stream that returns tweets when they
// have the hash tag #twitterspiritanimal
var stream = T.stream('statuses/filter', { track: ['#twitterspiritanimal'] })

// And when that stream receives a tweet we will emit the event below.
stream.on('tweet', function (tweet) {

	// Using the regular expression above we make sure it isn't a re-tweet.
	if (!rt.test(tweet.text)) {
		// not a re-tweet so we send a response.
		sendResponse(tweet);
	}
});