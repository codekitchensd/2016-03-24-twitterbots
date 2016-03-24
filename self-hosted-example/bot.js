var tracery = require('tracery-grammar');
var moment = require('moment');

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

var oldProcessedGrammar = tracery.createGrammar(oldUserGrammar);
oldProcessedGrammar.addModifiers(tracery.baseEngModifiers);

var strongProcessedGrammar = tracery.createGrammar(strongUserGrammar);
strongProcessedGrammar.addModifiers(tracery.baseEngModifiers);

var spryProcessedGrammar = tracery.createGrammar(spryUserGrammar);
spryProcessedGrammar.addModifiers(tracery.baseEngModifiers); 

var oldResponse = function() {
	return oldProcessedGrammar.flatten("#origin#");
};

var strongResponse = function() {
	return strongProcessedGrammar.flatten("#origin#");
};

var spryResponse = function() {
	return spryProcessedGrammar.flatten("#origin#");
};

var Twit = require('twit');


var T = new Twit(
{
    consumer_key:         process.env.TWITTER_CONSUMER_KEY
  , consumer_secret:      process.env.TWITTER_CONSUMER_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}
);

var tweetResponse = function(iScreenName, iResponse) {
	T.post('statuses/update', { status: "@" + iScreenName + iResponse }, function(err, data, response) {
  		// console.log(data)
  		console.log(data.text);
	})
};

var sendResponse = function(iTweet) {
	var acctCreation = moment(iTweet.user.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('YYYY');
	// if more than 1200 tweets give strong response
	if (iTweet.user.statuses_count >= 1200) {
		tweetResponse( iTweet.user.screen_name, strongResponse() );
	} else if (acctCreation >= 2012) {
		// else if older than 2012 give old response
		tweetResponse( iTweet.user.screen_name, oldResponse() );
	} else {
		// else give spry response
		tweetResponse( iTweet.user.screen_name, spryResponse() );
	}

}



var stream = T.stream('statuses/filter', { track: ['#twitterspiritanimal'] })

var rt = new RegExp("RT @");

stream.on('tweet', function (tweet) {
	if (!rt.test(tweet.text)) {
		// not a re-tweet
		sendResponse(tweet);
	}
});



