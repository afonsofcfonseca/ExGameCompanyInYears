var createRecapBasedOnChoices = function( state ){
console.log( state.year )
		switch( state.year ){
			case 0:
				return year0Recap( state )
				break;
			case 2:
				return year2Recap( state )
				break;
			case 4:
				return year4Recap()
				break;
	}

}


function year0Recap( state ){

	var companyYear = state.company.year0

	/*// INVESTEMENT END EVENT
	var investment = 0
	var equity = 80
	if( companyYear.endEvent == "accept" ){
		investment = 40000
	}
	else{
		investment = 30000
	}
	<div class='recap-numbers'>
		Investment <label>+${investment}</label>
	</div>*/

	//SALARIES
	var plus = 0
	if( companyYear.middleEvent && companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "salary" )
		plus = 100

	salaries = countSalary( state.company.team, plus)
	var total =  salaries.total * 24
	var developersSalary = salaries.developersSalary * 24
	var artistsSalary = salaries.artistsSalary * 24

	// GAME REVENUE
	var gameRevenue = 40500
	if( companyYear.middleEvent ){
		if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "meetings" )
			gameRevenue += 2000
		if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "beta" )
			gameRevenue += 2000
	}
	if( state.company.team && state.company.team.developers == 1 )
		gameRevenue += 2000

	var infrastructures = "2400" // 100 per month

	// FINAL MATH
	var finalTotal = 0
	// finalTotal += ( investment + gameRevenue )
	finalTotal -= developersSalary
	finalTotal -= artistsSalary
	finalTotal -= infrastructures

	var toSendBack = {
		vision: companyYear.vision,
		finalTotal,
		developerLeft: ( companyYear.endEvent == "changeVision" ? true : false )
	}

	// FINAL TEXT
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "salary" ) middleEvent = `Money it's not everything, you should have tried to make more meetings`
		if( companyYear.middleEvent.chose == "meetings" ) middleEvent = `Choosing meetings instead of a raise was a wise choice and brought better performance`
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "beta" ) middleEvent = `Your beta version made your release less buggy and sold better`
		if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Not making a beta version  made your release more buggy and you sold less`
	}

	var textOfTheYear = `${companyYear.recapOfYearText}. Your game went well ,sellings were great ( however you were not profitable, yet ) and
	you've learn a lot about your team and how to work with them. ${middleEvent}`

	// HTML DOM
	var title = "2 Years have passed"
	var description = `
	<div class='descriptionDiv'>
		<p class='descriptionModal'>
			${textOfTheYear}
		</p>
	</div>
	<div class='recap'>
		<div class='recap-numbers'>
			Game1 <label>+${gameRevenue}</label>
		</div>
		<div class='recap-numbers'>
			Developers <label>-${developersSalary}</label>
		</div>
		<div class='recap-numbers'>
			Artist <label>-${artistsSalary}</label>
		</div>
		<div class='recap-numbers'>
			Infrastructures <label>-${infrastructures}</label>
		</div>
		<hr/>
		<div class='recap-numbers total'>
			Total <label>${ finalTotal }</label>
		</div>
	</div>`

	return {
		title,
		description,
		toSendBack
	}
}


function year2Recap( state ){
	console.log("/////")
	console.log( state )

	var companyYear = state.company.year2

//Investment
	var investment = 0
	if( companyYear.endEvent == "100k" ){
		investment = 100000
	}
	else if( companyYear.endEvent == "500k" ){
		investment = 500000
	}

//SALARIES
	var plus = 100
	if( state.company.year0 && state.company.year0.middleEvent 
		&& state.company.year0.middleEvent.event1 && state.company.year0.middleEvent.chose == 1 ){
		plus = 200
	}

	salaries = countSalary( state.company.team, 100 )
	var totalSalary =  salaries.total * 24

	var salariesObj = {
		Developers: salaries.developersSalary * 24,
		Artist: salaries.artistsSalary * 24,
		Designers: salaries.designersSalary * 24,
		SFX: salaries.sfxSalary * 24,
		Marketing: salaries.marketingSalary * 24
	}

	function drawTeamExpansives( ){

		var elements = ""
		for( var x in salariesObj ){
			if( salariesObj[x] == 0 ) continue 

			if( salariesObj[x] ){
				elements += `<div class='recap-numbers'>${x} <label>-${salariesObj[x]}</label></div>`
			}

		}

		return elements 
	}


//INFRASTRUCTURE
	var infrastructures = 4800 // 200

//OFFICE
	var office = 2000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		office = 1500


//GAME
	var gameRevenue = 65000
	if( companyYear.officeChoice == "Small but with other start-ups near" )
		gameRevenue += 10000

	if( companyYear.middleEvent.event == 1 && companyYear.middleEvent.chose == "lead")
		gameRevenue += 5000

	if( companyYear.middleEvent.event == 2 && companyYear.middleEvent.chose == "accept" )
		gameRevenue += 5000

	gameRevenue += makeMathWithTeamSelection( salaries )

	function makeMathWithTeamSelection( ){
		//salaries
		return 0
	}


//TOTAL
	var finalTotal = office + gameRevenue + infrastructures + totalSalary

	// HTML DOM
	//Falta middle eventr
	var middleEvent = ""
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 1 ){
		if( companyYear.middleEvent.chose == "lead" ) middleEvent = `You made one of the developers lead programmer and helped a lot. He organized the sprints and developments and the game sold better because of the quality of the code.`
		if( companyYear.middleEvent.chose == "ignore" ) middleEvent = `Ignoring the proposal of one of the developers to became a Lead programmer made him unfocused and uninterested on the job he's doing.`
	}
	if( companyYear.middleEvent  && companyYear.middleEvent.event == 2 ){
		if( companyYear.middleEvent.chose == "accept" ) middleEvent = `You accepted that one of the developers start working for other company at the same time. The responsabilty 
				he took made him work harder and make a better game for ${ state.company.name }. Your game sold better because of that choice.`
		if( companyYear.middleEvent.chose == "reject" ) middleEvent = `Ignoring the proposal of one of the developers to make a feature for other company made him unfocused and uninterested on the job he's doing.`
	}

	var textOfTheYear  = `${companyYear.recapOfYearText} ${ middleEvent }`

	var description = `
		<div class='descriptionDiv'>
			<p class='descriptionModal'>
				${textOfTheYear}
			</p>
		</div>
		<div class='recap'>
			<div class='recap-numbers'>
				Investment <label>+${investment}</label>
			</div>
			<div class='recap-numbers'>
				Game1 <label>+${gameRevenue}</label>
			</div>
			${ drawTeamExpansives() }
			<div class='recap-numbers'>
				Office <label>-${office}</label>
			</div>
			<div class='recap-numbers'>
				Infrastructures <label>-${infrastructures}</label>
			</div>
			<hr/>
			<div class='recap-numbers total'>
				Total <label>${ finalTotal }</label>
			</div>
		</div>`


	return {
		title: "4 Years have passed",
		description,
	}
}


function year4Recap(){
	return {
		title: "year 4",
		description: "description 4"
	}
}
