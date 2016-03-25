# Twitterbots!

* Who here is on twitter? (Y'all know what it is, right?)
* Give some examples of twitterbots
   * [@lettergamebot](https://twitter.com/lettergamebot) (made in 16 minutes!)
   * [@magicrealismbot](https://twitter.com/magicrealismbot)
   * [@oliviataters](https://twitter.com/oliviataters)
   * [@mothgenerator](https://twitter.com/mothgenerator)
   * [@softlandscapes](https://twitter.com/softlandscapes)
   * [@tinyspaceadv](https://twitter.com/tinyspaceadv)
   * [Stay Woke Bot](http://feeltrain.com/blog/stay-woke/)
   * More at [#botALLY](https://twitter.com/search?f=tweets&vertical=default&q=%23botALLY&src=tyah)...
* Explain what we're going to make!   
  (SPOILER: it's a twitter bot with CheapBotsDoneQuick using the Tracery language.)
 
## Sign up for a Twitter account

We need to create a new twitter account for your twitter bot!   
<https://twitter.com/signup>

> :point_up: **TIP:** If you already have a twitter account, use Incognito or Private mode to sign up, 
                      so that you don't need to log out of Twitter. 

Full Name: _name of your twitterbot_   
Email: _see tip below_   
Password: _keep it somewhere, you'll need it again_

Don't forget to click Advanced Options, and uncheck both `Let others find me by my...` options.

> :point_up: **TIP:** If you have a gmail account, you can add `+anything` to the part of the email before the `@`, 
  and it will be treated like a new email address but still go to you!   
  Let's say that your gmail address is `codekitchensd@gmail.com` but you already have a twitter 
  account associated with that address. You can sign up for your bot with `codekitchensd+funnybot@gmail.com`.
  
## Give permissions to Cheap Bots Done Quick

Usually, to run a twitterbot, you'd need to run code on a server to tell your new twitter account what to post. Instead, we're using a free service from [**George Buckenham**](https://twitter.com/v21) called *Cheap Bots Done Quick,* which will let you program your very own twitterbot:   
<http://cheapbotsdonequick.com>

> :warning: _Make sure that you are **logged out** of your personal twitter account (or in Private/Incognito mode), and logged in to your newly-created bot account._

You'll now see a window with some sample code! Let's find out what it does...

## Understanding the building blocks 

We'll be using a language called [**Tracery**](http://tracery.io) by [Kate Compton](http://twitter.com/galaxykate). It's a programming language for generating stories, written in a subset of JavaScript, which is the lanugage that runs in your web browser. 

> :information_source: You may see this particular formatting of code referred to as `JSON`, which stands for [`JavaScript Object Notation`](http://json.org/).

To understand it, if you're new to programming, you need to understand a few terms:
* We're working with three **data types**: strings, arrays, and objects.
   * **Strings** are text. A string is a sequence of text characters between two quotation marks, 
     like `"Hello, I am a string."` or `"C0d3 k1tch3n IS M@DD Ph47 yo!!"` or `"boo"` or `"$22.50"`. 
      * If you want to put a `"` inside a string, you'll need to _escape_ it with a `\`, like so: 
        `"Where is this so-called \"sasquatch,\" Mr. Mulder?"`
      * If you want to add a tab, use `\t` inside your string
      * If you want to add a return/new line, use `\n` inside your string
   * **Arrays** are lists. An array is a comma-separated collection of data (like strings) in between brackets `[ ]`, 
     like `["apples","bananas","clementines"]` or `["zebras","alphabet","$14.00","Hello, Jane."]`. 
   * **Objects** are groups of **keys** (names) and **values** (data or other computer code). 
     They're written as comma-separated groups of `key: value` between curly braces `{ }`, like so   
```
{  
  "name": "Grizelda",  
  "nicknames": ["Izzy","Zelda","Lil' Griz"],  
  "favoriteAnimals": ["bats","bees","bonobos"]  
}
```

## Tracery!

_If you want to just dive in, go to [this interactive tutorial](http://www.crystalcodepalace.com/traceryTut.html) and start playing!_

Tracery is a way to create a **grammar**, a dictionary of symbols. 

#### Symbols

A **symbol** is what you might know from other programming as a *variable* ...it's a **key** for a **value** that may change. 

For example, your symbol might be `animal`, and when Tracery sees it in your code, 
you want Tracery to replace it with something from your list of animals, like 
`aardvark`,`asp`, or `anteater`. You'd do this by making a **ruleset**:   
`"animal": ["aardvark","asp","anteater"]`   
...and then whenever Tracery sees the word `animal` surrounded by `#` in your code,   
`I love the mighty #animal#.`   
it will fill in the blank, like _mad libs_:   
`I love the mighty aardvark.` or `I love the mighty asp.`   
```
{
  "animal": ["aardvark","asp","anteater"],
  "story": ["I love the mighty #animal#."]
}
```

#### Modifiers

Symbols can have **modifiers**, which are functions that do something to the symbol. 

Modifiers are used by putting a period and then the name of the modifier after the name 
of the symbol, for example:  
`#animal.capitalizeAll#` --> `AARDVARK` or `ANTEATER`  

Modifiers can also be _chained_ together, so you can change multiple aspects of a symbol at once:   
`#animal.capitalize.s#` --> `Anteaters` or `Asps`   

Tracery has **several built-in modifiers:**   

| Modifier | What it does | Example |
| ---      | ---          | ---     |
| `.capitalize` | capitalizes the first letter | `Aardvark` |
| `.capitalizeAll` | Capitalizes Each Word In The Phrase | `Angry Aardvaark` |
| `.s` | pluralizes the word* | `aardvarks` |
| `.a` | adds an `a` or `an` in the front | `an aardvark` or `a horse` |
| `.ed` | puts verb in past tense by adding -`ed` to the end | `#verb.ed#` --> `bounced` |
| `.replace(x,y)` | does a search and replace | `#story.replace(his,her)#` --> `I'm her biggest fan` |

(* It will try to be smart about pluralizing, too! `fly` becomes `flies`, for example.)
   
```
{
  "animal": ["aardvark","asp","anteater","fly"],
  "story": ["I love the mighty #animal.s#.", "#animal.a.capitalize# is my BFF."]
}
```

#### Nesting

You can nest symbols inside symbols, including the main symbol. This is called [**recursion**](https://www.google.com/?gws_rd=ssl#safe=active&q=recursion). 

On the simplest level, in the code above, you could have... 
```
{
  "animal": ["aardvark","asp","anteater","fly"],
  "story": ["I love the mighty #animal.s#.", "#animal.a.capitalize# is my BFF."],
  "origin": ["I must say: #story#"]
}
```

Or you could get very convoluted, and have...
```
{
  "storyWithin": ["Gather round, and I'll tell ye a story! \"#story#\"","I have nothing left to say. THE END."],
  "story": ["It was a dark and stormy night, and the Captain said to his men, \"#storyWithin#\""],
  "origin": ["Okay, kids, tuck yourselves in and we'll begin: #story#"]
}
```
...but be sure to always have _at least_ one option that doesn't nest when you do this (like the `THE END` branch above), or Tracery would keep nesting stories inside stories inside stories inside stories inside stories inside stories inside stories inside stories inside stories... _infinitely!_

#### Actions

An action lets you _do things_ to **a set of symbols** before Tracery goes through and substitutes values. For example, you could set the value of several symbols at the same time. A simple example would be setting the name of a character and the character's pronouns at the same time, so that they're consistent throughout your story. Actions are powerful, and slightly confusing at first! 

But wait...doesn't CheapBotsDoneQuick (as of mid-March) have a warning at the top of the page that says...

> _Note: currently setting variables (like part 6 here) is bugged. They will only work if not specified within their own node._ 

...which means that Actions don't work? 

And the answer is... yes, there is that warning, and **yes, Actions still appear to work.**

A simple example of actions (as in Part 6 of [the Tracery tutorial here](http://www.crystalcodepalace.com/traceryTut.html)) is setting pronouns so that they're consistent (e.g., "she","her","hers") throughout your story: 
```
{
    "origin":["#[#setCharacter#]story#"],
    "setPronouns":["[cThey:they][cThem:them][cTheir:their][cTheirs:theirs]","[cThey:she][cThem:her][cTheir:her][cTheirs:hers]","[cThey:he][cThem:him][cTheir:his][cTheirs:his]","[cThey:it][cThem:it][cTheir:its][cTheirs:its]"],
    "cName":["Leslie","Avery","Pat","Methuselah"],
    "setCharacter":["[#setPronouns#][name:#cName#]"],
    "story":["#name# woke up in a strange place. #cThey.capitalize# went to #cTheir# home. The doorknob was #cTheirs#, but everything else was foreign to #cThem#."]
}
```

#### Visual Editor 

If you're not too fond of typing `{}`s and `[]`s and making sure that your `,` are in line, Kate's made a [color-coded **visual editor**](http://www.brightspiral.com/tracery/) that greatly simplifies writing Tracery code. 

When you're done, just click the `JSON` toggle button to see the Tracery code to paste into Cheap Bots Done Quick.

## Using Tracery in CBDQ

#### Your Tracery code

The symbol that will be used as your tweet is `origin`.   
`"origin": ["#beginning# #callToAction# #climax# #fallingAction#"]`   
It's usually put at the beginning or the end of the Tracery object.

Cheap Bots Done Quick will give you a live preview of what your twitterbot will output. If you have an error in your code—you forgot a `,` or added one after the last line, or are missing a closing `]`, or anything—it will give you a big, shiny RED error message. 

You can refresh this preview as much as you want. 

#### Tweeting manually

If you see something in the preview that you like, you can manually tweet it.

#### Tweeting on a schedule

Additionally, you can schedule it to generate a tweet and post on a schedule.   
It defaults to `Never` post a tweet as *your twitterbot's account name*.   
You can set the twitterbot to tweet anywhere from _every 10 minutes_ to _every year._

> :warning: It goes without saying: don't change the schedule from `Never` and then SAVE unless you are ready for your bot to start tweeting!

If your generated tweet is longer than 140 characters, Cheap Bots Done Quick will try again (up to five times) until it creates a tweet-length bit of text.

## Going further...

#### Looking at other people's source code

You can read the Tracery source code of other twitterbots on CheapBotsDoneQuick by going to an address like   
`http://cheapbotsdonequick.com/source/nameoftwitterbotgoeshere`   
where `nameoftwitterbotgoeshere` is obviously the name of the twitterbot's account.   
If the author of that bot has chosen to share the source code you'll see it!   
If not: :cry:

For example:   
<http://cheapbotsdonequick.com/source/lettergamebot>

#### Generating images 

If you want to take it to the next level, you can write code to generate images with CheapBotsDoneQuick!   
These images are made with **Scalable Vector Graphics** or **SVG**, which is an XML markup (text file) that describes shapes and lines, along with their positions, rotation, size, colors, shadows, etc.   

To learn more about SVG, check out these tutorials:   
* <https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial>
* <http://tutorials.jenkov.com/svg/index.html>
* <http://svgtutorial.com/>

For examples of SVG twitterbots, look at the source code for Soft Landscapes   
<http://cheapbotsdonequick.com/source/softlandscapes>   
or Tiny Space Adventures   
<http://cheapbotsdonequick.com/source/tinyadv>   
