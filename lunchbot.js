var request = require("request"),
SLACK_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/3149042/q86j07/';

var bot_text;

/*
	Built during John Keefe's #MakeEveryWeek project
	See http://johnkeefe.net/make-every-week-lunch-bot

	The Slack webook URL used below is something you can get from inside the Slack app
	to send messages into a Slack channel. Since it's secret, I keep it
	in a file outside of this directory structure so I don't accidentally
	publish it on Github. I bring it above as "keys" from a file
	called slack_keys.js. The structure of that file is:

	var SLACK_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/487356962409938974/elGAYB88iN91V469UDxIrZ04OZbvkvVWeRUmEST4dGO2rolragFg-_0t4fd36ICEKMJG';

	    module.exports.SLACK_WEBHOOK_URL = SLACK_WEBHOOK_URL;

	If your code is going to stay private, you can skip this by deleting line 2
	and editing the first part of the options variable below like so:

	var options = {
		url: 'https://discordapp.com/api/webhooks/487356962409938974/elGAYB88iN91V469UDxIrZ04OZbvkvVWeRUmEST4dGO2rolragFg-_0t4fd36ICEKMJG',
		...

*/

// List of episodes and Google Maps urls as JSON
var episodes = [
    {
        "youtubeurl": "https://www.youtube.com/watch?v=oh5p5f5_-7A",
        "episode": "Season 1 Episode 1",
        "details": "Bob paints A Walk in the Woods"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=RInDWhYceLU",
        "episode": "Season 1 Episode 2",
        "details": "Bob paints Mt. Mckinley"
		},
		{
        "youtubeurl": "https://www.youtube.com/watch?v=UOziR7PoVco",
        "episode": "Season 1 Episode 3",
	       "details": "Bob paints Ebony Sunset"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=0pwoixRikn4",
	       "episode": "Season 1 Episode 4",
	       "details": "Bob paints Winter Mist"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=DFSIQNjKRfk",
	       "episode": "Season 1 Episode 5",
	       "details": "Bob paints Quiet Stream"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=loAzRUzx1wI",
	       "episode": "Season 1 Episode 6",
	       "details": "Bob paints Winter Moon"
	   },
		{
	       "youtubeurl": "https://www.youtube.com/watch?v=sDdpc8uisD0",
	       "episode": "Season 1 Episode 7",
         "details": "Bob paints Autumn Mountain"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=kQlFwTOkYzg",
	       "episode": "Season 1 Episode 8",
	       "details": "Bob paints Peaceful Valley"
	   },
		{
	       "youtubeurl": "https://www.youtube.com/watch?v=QxcS7p1VHyQ",
	       "episode": "Season 1 Episode 9",
	       "details": "Bob paints Seascape"
	   },
  	{
	       "youtubeurl": "https://www.youtube.com/watch?v=wDnLlywAL5I",
	       "episode": "Season 1 Episode 10",
	       "details": "Bob paints Mountain Lake"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=Q03YvknOVe0",
				"episode": "Season 1 Episode 11",
	       "details": "Bob paints Winter Glow"
	   },
		{
	       "youtubeurl": "https://www.youtube.com/watch?v=4E35-8x_y04",
	       "episode": "Season 1 Episode 12",
        "details": "Bob paints Winter Glow"
	   },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=IEQWfszfRlA",
        "episode": "Season 1 Episode 13",
        "details": "Bob paints Final Reflections"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=GARWowi0QXI",
        "episode": "Season 2 Episode 1",
        "details": "Bob paints Meadow Lake"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=VPfYRj4DDco",
        "episode": "Season 2 Episode 2",
        "details": "Bob paints Winter Sun"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=aOJsKNzO3i8",
        "episode": "Season 2 Episode 3",
        "details": "Bob paints Ebony Sea"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=I-ousb8-SD0",
        "episode": "Season 2 Episode 4",
        "details": "Bob paints Shades of Grey"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=rTTWw5Gd79I",
        "episode": "Season 2 Episode 5",
        "details": "Bob paints Autumn Splendor"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=6O4sfJd8G_M",
        "episode": "Season 2 Episode 6",
        "details": "Bob paints Black River"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=Vx6v47gHBWM",
        "episode": "Season 2 Episode 7",
        "details": "Bob paints Brown Mountain"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=0FYfo94qefg",
        "episode": "Season 2 Episode 8",
        "details": "Bob paints Reflections"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=PMDyPrE0puo",
        "episode": "Season 2 Episode 9",
        "details": "Bob paints Black and White Seascape"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=BW2wKKFvH1g",
        "episode": "Season 2 Episode 10",
        "details": "Bob paints Lazy River"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=GzSqjyQUPZQ",
        "episode": "Season 2 Episode 11",
        "details": "Bob paints Black Waterfall"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=9jIt95PCFAA",
        "episode": "Season 2 Episode 12",
        "details": "Bob paints Mountain Waterfall"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=miJ19Kz_i3Y",
        "episode": "Season 2 Episode 13",
        "details": "Bob paints Final Grace"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=loit61vLUMc",
        "episode": "Season 3 Episode 2",
        "details": "Bob paints Blue Moon"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=fuFalEXVN0k",
        "episode": "Season 3 Episode 3",
        "details": "Bob paints Bubbling Stream"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=8ysFkNYwhAE",
        "episode": "Season 3 Episode 4",
        "details": "Bob paints Winter Night"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=8Zge88tVwjE",
        "episode": "Season 3 Episode 6",
        "details": "Bob paints Covered Bridge"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=8Zge88tVwjE",
        "episode": "Season 3 Episode 5",
        "details": "Bob paints Distant Hills"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=8Zge88tVwjE",
        "episode": "Season 3 Episode 7",
        "details": "Bob paints Quiet Inlet"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=l141Y0x8om0",
        "episode": "Season 3 Episode 8",
        "details": "Bob paints Night Light"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=OFKFUJ9eDNs",
        "episode": "Season 3 Episode 9",
        "details": "Bob paints The Old Mill"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=L5bXkI0-pEg",
        "episode": "Season 3 Episode 10",
        "details": "Bob paints Campfire"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=WJJwrnFhUUg",
        "episode": "Season 3 Episode 11",
        "details": "Bob paints Rustic Barn"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=P_DaqkFbnac",
        "episode": "Season 3 Episode 12",
        "details": "Bob paints Hidden Lake"
    },
		{
        "youtubeurl": "https://www.youtube.com/watch?v=Z0vtjRLqXcQ",
        "episode": "Season 3 Episode 13",
        "details": "Bob paints Peaceful Waters"
    },
];

// Pick a number, 0 to the length of the episode list less one
var pick = Math.floor( Math.random() * (episodes.length - 1 ) );

bot_text = "Today, may I suggest *" + episodes[pick].episode + " " + episodes[pick].details + "*. You can find it here:" + episodes[pick].youtubeurl;

console.log(bot_text);

// Compose the message and other details to send to Slack
var payload = {
	text: bot_text,
	icon_emoji: ":paintbrush:",
	username: "Bob Ross",
	channel: "#Announcements the Prequel"
};

// Set up the sending options for the request function.
// See note about the SLACK_WEBHOOK_URL above.
var options = {
	url: SLACK_WEBHOOK_URL,
	method: 'POST',
	body: payload,
	json: true
};

// Send the webhook
request(options, function (error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log(error);
  }
});
