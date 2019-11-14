
var createStory = function( state, parentComponent ){

 	var { team, income, equity } = state.company

 	var title = ""

 	switch( state.year ){
 		case 0:
 			if( state.middleEvent == true ) return year0MiddleEventStory( income, equity,team, parentComponent)
 			else if( state.recapEvent == true ) return recapScreen( state, parentComponent )
 			else return year0Story( income, equity,team, parentComponent )
 			title = '2 Years have passed'

		case 2:
 			return year2Story( income, equity,team, parentComponent )

		case 4:
 			return year4Story( income, equity,team, parentComponent )

		default:
			console.log( "failed loading the years")
 	}

 	return({
 		title,
 		description: getDescriptionStory()
 	})

}


////////////////////////////////// OPTIONAL CARDS //////////////////////////////////

var startingCardIntroduction = `Starting you professional life can be hard and complex. The purpose of this 
workshop is to help you understand a bit better what it takes to start a videogame company, as well, as creating a vision for your products and manage
your future team.`

var startingCardHowTo = `This web application simulates two years of your company life for each thirty minutes of real life. 
Try to be honest, make your choices, give original and funny answers and enjoy.` 

var startingCardStory = `You are about to start your company. To do so, write down the name and a small description
of something unique that you want to do in it.`

let endingCardDescription = `Congratulations. Your company is up and running for six years.
Below you can see the overview of the comapany since the beginning.`


////////////////////////////////// YEAR 0 //////////////////////////////////

var gameCompanyDescription = `To make great games, you need to start a company first. Your company is what gives soul to your games and your team.
	For that, start by establishing and vision and objectives.`

var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
	pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
	tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var firstGameDescription = `Your company is pretty fresh and still needs some money to start betting in big ideias for games.
	Start by creating a game small but addictive, choosing a hot genre ( Moba's, autochess ) but with a original twist. 
	The game needs to be an assure hit to bring some money and investment to the company` 

var team0YearDescription = `Pick one of the options below for starting your team. Dont forget that what you choose will reflect on your games
	If you go for a designer and a developer, your game will have a great UX/UI design and some unique style but i'll have a few bugs.
	If you go for two developers, you'll choose a bug free game but it will lack the design and an unique touch`

var environment0YearDescription = `From now on you'll have an office to maintain. You can set the rules and see if it makes sense, from the 
	working scheduel, to behaviour inside the office, you are the one to have the last word. Can people work remotely? Can the team make breaks and play videogames?
	Tell some of the rules you would like to settle`

var teamBuilding0YearDescription = `Team bulding means activities you and your team do not related with company work, it's used normaly to enhance social 
	relations and create bounds with the team. A board game on monday nights, going to the cinema every month, camping every two month... Just thing of fun 
	activities to do with your team outside your work`

var vision0YearDescription = `To make things more fun, pick of the choices down below. Your choice for the vision of the games you are creating
	will affect some inputs and choices you'll have to make in the next years`


let intro1Focus = "You are in front of your computer and ready to start think about game that your company will make."
let focusYear0First = `${intro1Focus} You know that you wanna do something different for the consoles. 
Think of a mobile game that you love and try to make similar game but for a console`

let focusYear1First = `${intro1Focus} You wanna do something different, so you are making your main game mechanics based on sound`

let focusYear2First = `${intro1Focus} You are feeling pretty confident and relaxed, so you decided that this game will be something pretty relaxing.
Something like ( Journey, Everything or Katamari )`

var focusYear0 = [
	focusYear0First,
	focusYear1First,
	focusYear2First
] 

////////////////////////////////// MAIN EVENT

 var year0Story = function( income, equity,team, pC ){

	var text = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'> Your company had a great start! You released your first game successfully and got your team really committed </p>
		<p class='descriptionModal-type2'> The company spent around ${ teamSalary } $ with the team Salaries </p>
		<p class='descriptionModal'>You caught the attention of some investors that are willing to negotiate with you.</br>
		They want to give you 40k $ for 20% of your company. Do you accept it? ( Don t forget that a counter proposal it's always an option. You can get
		a better evaluation of the company or the investors can turn their back on the deal ) </br>
		</br></p>
		<p class='descriptionModal-type2'>What would you do?  </p>
	</div>`

	var firstChoice = "You accepted the offer and got 40.000$ for 20% equity of the company"

	var secondChoice = `The counter proposal made your investors think you dont know exacly what you are doing. So, now, they
	are only offering 30.000$ for 20% equity of the company`

	var teamSalary = getSalaryForTeam( team, 0 )
	var year0 = {}

	var buttons = <React.Fragment>
		<button
			onClick={  () => {
					year0 = {
						endEvent: "accept"
					}
					pC.editCompanyState( "year0", year0 )
					pC.recapTheYear( firstChoice )

				}
			}>Accept the offer</button>
		<button
			onClick={ () => {
					year0 = {
						endEvent: "counter"
					}
					pC.editCompanyState( "year0", year0 )
					pC.recapTheYear( secondChoice )

				} 
			}>Counter Proposal</button>
	</React.Fragment>

 	return {
 		title: "2 Years have passed",
 		description: text,
 		buttons,
 	}

}

////////////////////////////////// MID YEAR EVENT

var year0MiddleEventStory = function( income, equity, team, pC ){

	let year0 = {}

	var text1 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>Since you've started to work with a team, the game is developing
		faster since the beggining but you can't shake the feeling that the company could do a lot better, the team
		is unorganized and not that commited as you expected.</p>
		<p class='descriptionModal-type2'> What do you do? </p>
		<p class='descriptionModal'>You can raise the salary of the team, and maybe they'll be happier and more focused or
		you can start to make meetings with them, so the game is more right on track.</p>
	</div>`

	var buttons1 = <React.Fragment>
	<button
		onClick={  () => {
			year0.middleEvent = {
				event: 1,
    			chose: "salary",
			}
			pC.closeMiddleEvent( "year0", year0 )
			}
		}>Raise 100$ Salary</button>
	<button
		onClick={ () => {
			year0.middleEvent = {
				event: 1,
    			chose: "meetings",
			}
			pC.closeMiddleEvent( "year0", year0 )
			} 
		}>Start doing meetings</button>
	</React.Fragment>

	var text2 = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>Beta versions normaly give you some good feedback from the users. But for making one, you always have to loose
		time with that and compromise the last build of the game on the release day.</p>
		<p class='descriptionModal-type2'> What do you choose? </p>
		<p class='descriptionModal'>Take a few days to make a beta version and get feedback? or keep doing the normal development?</p>
	</div>`

	var buttons2 = <React.Fragment>
	<button
		onClick={  () => {
			year0.middleEvent = {
				event: 2,
    			chose: "beta",
			}
			pC.closeMiddleEvent( "year0", year0 )
			}
		}>Beta Version</button>
	<button
		onClick={ () => {
			year0.middleEvent = {
				event: 2,
    			chose: "ignore",
			}
			pC.closeMiddleEvent( "year0", year0 )
			} 
		}>Ignore</button>
	</React.Fragment>

	var version = getRandomInt( 1, 2 )
	var description = version == 1 ? text1 : text2
	var buttons = version == 1 ? buttons1 : buttons2

	return {
 		title: "Middle Year Event",
 		description: description,
 		buttons: buttons,
 	}

}



////////////////////////////////// YEAR 2 //////////////////////////////////

 var descriptionSpentMoney = `Making the right decision on the right time is everything. Check what went bad on your recap of the last 2 years
and focus on that. Choose wisely when thinking where to spend the company money. Investing in growing your team is always a good move.
 Check what if you need a new department, like UX/UI Design, new artists, SFX, more developers, someone to promote your game
 and take care of marketing.`

 var secondGameDescription = `Now is a good time to start to think in releasing a new game. Do you think your first game went well? If yes, you should go for a
 second instalment? Or maybe if you want to change thinks a bit or your last game didnt went so well, you can try a new genre, a new story or a new platform.
 If you wanna go for something different, just try the random roll. ( click on the icon )`

 var focusOption1 = `This 2 years of work taught you a lot but i ve learn a lot from games too... All your life you ve played simulation games.
 From Sims and Simcity, to goat simulator. You know, for sure, that this type of game can teach a lot to people. So you decide to make that genre on your next game`

 var focusOption2 = `You are RTS ( real time strategy ) lover. You played everything Age of empires, Warcraft III, Rome total war... You name it.
 The ideia of making RTS game doesn t leave your mind. So you decided to make one for your second game. And you wanna try something new on the genre`

 var focusOption3 = `The last 2 years were pretty stressfull and that made you take great pleasure in gory games. After a day of work you just want to
 relax on the sofa and play some Doom. With that in mind, you decided that your next game will take any kind of genre but will, for sure, be a bloody gory game`

var officeSpaceYear2Description = `If you wanna get bigger, you'll need to pick a bigger office. You have two suggestions, one
is a small but cosy office in the building where other startups work and you know it would be good for networking. The other suggestion is
a much bigger office, isolated and more expansive` 

var biggerTeamYear2Description = `The team keeps getting bigger and you should start to think in some standard rules, 
so everything is well organized inside the office and with the games development. Tell some of the ideias or rules you wanna
apply to your company`

 var focusDescription = [
 	focusOption1,
 	focusOption2,
 	focusOption3
 ]

////////////////////////////////// MAIN EVENT

 var year2Story = function( income, equity, team, pC ){

	var title = ""
	var text = ""

 	return {
 		title: '2 Years have passed',
 		description: text
 	}

 }

////////////////////////////////// MID YEAR EVENT


///////////////////////////////// YEAR 4 //////////////////////////////////

//Resources
//https://medium.com/seed-digital/how-to-business-model-canvas-explained-ad3676b6fe4a

var modelCanvasExplanation = `Everything is going perfect with the company and you started to figure it out how to go to market with
your games. And for that, your created a Canvas... And you know, if you fill the canvas for your third game, it will be a sure hit on the market
Every big company used this canvas and it's named Business Modal Canvas. It's purpose is to quickly and easily define your product / game`



var description4YearValuePropositions = `Here you have to describe the purpose of your game. What it as to offer to your client/player. What does the player have to win with your game?
Trains logic or reaction? Learn to strategy in a online game? Working together in a co-op game? In a nutshell, why would someone want to have this problem solved?
What does your game offers, that can be converted in a value to the player?`

var description4YearCustomerSegments = `In the customer Segment your think of your target player and try to break them in small parts. For gender, age, interests or habits.
This way you can start to check the market for what does this group of targets look for, what type of genre, story or commitment to the game`

var description4YearCustomerRelationships = `The Customer Relationship is what bounds and sticks the player to your game, is what makes the player go back to it the day after... If you are talking of a PvP ( Player vs Player) game, probably the competitive games,
if you are developing an MMORPG, level system are the thing to look. If the game is a solid Single Player
, it can be focus on the "Collectathon" or the Story. Try to think and explorer what the player really looks forward when playing a game. Think of your self playing that type of game. What do you want from it?`

var description4YearChannels = `Channels is what makes the player find your game. What channel does your game is mentioned? through facebook? Ads on mobile applications? A Brand activision?
It's important to have this figured it out. If this fails, your game will not be mentioned and will not have the credit it deserves. Normaly the channels to approach is studied on marketing campaigns`

var description4YearKeyActivities = `The Key Activities is what resources does your company need to create and mantain the game your are building.
When creating a game you have to worry about desigining, development, marketing... And after creating a game, you need to figure it out how you will maintain it.
Probably you will need patches, testing, updating.. If you think in realeasing DLCs and new features, you need to invest on the story and testing.
What is the activities your game need to offer the value proposition to your players?`

var description4YearKeyResources = `What resources you need to make your game doable. You need staff/team, computers, internet, office space, workshops, electricity... Think of every resource you need
if you want your company to make a game`

var description4YearKeyPartners = `Your partners are third parties company that help you build the game. The best example for this is to think what platform you will be releasing your game, if it's a mobile app, your partners
will be Apple or Google ( AppStore or PlayStore ), if you choose a PC game, than Steam, Epic Game Laucher, Humble Bundle Store will be your partners. 
The Partners are external companies that help you create, maintain and distribute your product/game`

var description4YearCostStructure = `Your product have costs being created ( Key Activities ), you need to worry about sustaining a valueable product once it goes live ( patches, updates, server, DataBases )
How much do you pay for your partnerships? 2 Years from now, what do you think you will have to pay for your server? For this answer, i dont want you to think precise costs but to write what are the costs you need to 
worry about when your game is created and goes live`

var description4YearRevenueStream = `The Revenue Streams is one of the thinks that makes the wheels turn and keep to product moving. This is what makes your income grow, what let's the company
keep going forward and what pays the games that you are making. Where does your game makes money? what way? Through selling the game itself? By microtransactions or maybe Ads revenue? There's a lot of ways
to bring revenue to the company.. Always keep one think in mind, the revenue that comes from the game needs to be equal or bigger to the costs related to his development.`


 var year4Story = function( income, equity, team, pC ){


	var title = ""
	var text = ""

 	return {
 		title: '2 Years have passed',
 		description: text
 	}

 }


////////////////////////////////// Others //////////////////////////////////

function getSalaryForTeam ( team = null, year ){

	var developers = 0
	var designers = 0
   	var totalSalary = 0

	if( team ){
		developers = team.developers || 0
		designers = team.designers || 0
	}


   	if( year == 0 ){

   		var salaryDev = developers * 1000
   		var salaryDesign = designers * 900

   	}

   	totalSalary = salaryDesign + salaryDev

   	return totalSalary


   }



var recapScreen = function( state, pC ){

	var { title, description, toSendBack } = createRecapBasedOnChoices( state )

	var code
	var validationCode
	if( state.year == 0 ) validationCode = "1991"
	else if( state.year == 2 ) validationCode = "JAN"
	else if( state.year == 4 ) validationCode = "JAN17"

	var buttons = <React.Fragment>
		<input placeholder="Password" type="text" name="name" onChange={ e => code = e.target.value } />
		<button
			onClick={  () => {
				if( code == validationCode )
					pC.changeYear('next', toSendBack )
				}
			}> Continue </button>
	</React.Fragment>

	return {
 		title,
 		description,
 		buttons,
 	}

}