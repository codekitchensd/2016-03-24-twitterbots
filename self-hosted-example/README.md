#Self-Hosted Twitter Bot Example
This example is based off of v21's [tracerybot](https://github.com/v21/tracerybot) example.
And use the following packages. 
- [Tracery](https://www.npmjs.com/package/tracery-grammar)
- [Twit](https://www.npmjs.com/package/twit)
- [Moment.js](http://momentjs.com/)

##Get it running.
1. Make sure [node.js](https://nodejs.org/en/) is installed. This should also install the npm packet manager.
2. Download this folder and navigate to it in your terminal.
3. Type `npm install` to install all the necessary modules to run the application.
4. Copy the **.env_EXAMPLE** and rename it **.env**
5. Populate the **.env** with your [twitter app](https://apps.twitter.com/) api keys ([instructions](http://support.yapsody.com/hc/en-us/articles/203068116-How-do-I-get-a-Twitter-Consumer-Key-and-Consumer-Secret-key-) on setting up an app and api keys).
6. Run the app with the **run_bot.sh** script.
	- `./run_bot.sh` from the terminal on Mac.
	- Windows instructions coming soon.
7. If all goes smoothly other users who use the hashtag **#twitterspiritanimal** will get a mention from your twitter app account.

##How it works.
The bot.js file contains all the code needed to create the node.js application running. Though there are a few dependencies that bot.js uses, Tracery, Twit, and Moment.js.

With `T` being the variable for Twit, we create a stream that listens for the string provided (#twitterspiritanimal). Then emits a response.
```javascript
var stream = T.stream('statuses/filter', { track: ['#twitterspiritanimal'] })

stream.on('tweet', function (tweet) {
	sendResponse(tweet);
...
```

Here we check a few conditions and give the appropriate response.
```javascript
var sendResponse = function(iTweet) {
	
	...

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
```

Final we crunch the tracery and post our response.
```javascript
var oldProcessedGrammar = tracery.createGrammar(oldUserGrammar);
oldProcessedGrammar.addModifiers(tracery.baseEngModifiers);

... 

var oldResponse = function() {
	return oldProcessedGrammar.flatten("#origin#");
};

...

var tweetResponse = function(iScreenName, iResponse) {

	T.post('statuses/update', { status: "@" + iScreenName + iResponse }, function(err, data, response) {

...
```


####More Coming Soon.