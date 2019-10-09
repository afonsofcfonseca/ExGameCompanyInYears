class PageContent extends React.Component {

  constructor( props ){
    super( props )

    this.state = {
      year: 0,
      goingDev: true,
      isPaused: false,
      company: {
        name: '',
        income: 0,
        equity: 100,
      }
    }

    this.goNext = this.goNext.bind( this )
    this.editCompanyState = this.editCompanyState.bind( this )
    this._handleKeyDown = this._handleKeyDown.bind( this )
    this.stopTime = this.stopTime.bind( this )
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown )
  }

  _handleKeyDown ( ev ) {

    const CONTROL_KEY = 17;
    const SHIFT_KEY = 16;
    const B_KEY = 66;
    var key;
    var isShift;
    
    if (window.event) {
      key = window.event.keyCode;
      isShift = !!window.event.shiftKey;
    } else {
      key = ev.which;
      isShift = !!ev.shiftKey;
    }
    if ( isShift ) {
      switch (key) {
        case 16:
          break;
        default:
          if( key == B_KEY ) this.setState({ goingDev: !this.state.goingDev })
          break;
      }
    }

  }



  goNext(){
    let year = this.state.year

    this.setState({
      year: ( year < 6 ? this.state.year + 2 : 6 )
    })
  }

  stopTime(){
    console.log("||PAUSED||")
    this.setState({isPaused: !this.state.isPaused})
  }

  editCompanyState( name, value ){
    var company = {}
    if( this.state.company != null ){
      company = this.state.company
    }

    company[ name ] = value

    this.setState({ company })
  }

  renderModule(){

    switch ( this.state.year ) {
      case 0:
        return React.createElement(Module_0Year, {editCompanyState:  this.editCompanyState})
        break;
      case 2:
        return React.createElement(Module_2Year, {editCompanyState:  this.editCompanyState})
        break;
      case 4:
        return React.createElement(Module_4Year, {editCompanyState:  this.editCompanyState})
        break;
      case 6:
        return React.createElement(Module_6Year, {editCompanyState:  this.editCompanyState})
        break;
      default:
      console.log( "retornou null" )
        return null;

    }

  }

  render(){
  
    return(
      React.createElement(React.Fragment, null, 
        React.createElement(Timer, {
          year:  this.state.year, 
          nextYear:  this.goNext, 
          isTimerPaused:  this.state.isPaused}
        ), 
        React.createElement("div", {className: "structure"}, 
          this.renderModule()
        ), 
        
         this.state.goingDev ? 
          React.createElement(Footer, {
            goNext:  this.goNext, 
            logState:  () => console.log( this.state ), 
            pauseState:  this.stopTime}
          ) :
            null
        
      )
    )
  }

}
;class Description extends React.Component{

  constructor( props ){
    super( props )

    this.state = {
      showDescription: false,
    }

    this.expandDiv = this.expandDiv.bind( this )
  }


  expandDiv(){

    this.setState({
      showDescription: !this.state.showDescription
    })

  }

  renderDescriptionDiv(){
    return ( this.props.description == null ? null : 
      React.createElement("div", {className: "inputDescriptionDiv", onClick:  this.expandDiv}, 
        React.createElement("i", {className: "fa fa-chevron-down", "aria-hidden": "true"}), 
        React.createElement("div", {className: "descriptionInnerChild", style: {display: this.state.showDescription ? 'block' : 'none'}}, 
          React.createElement("p", null, this.props.description)
        )
      )
    )
  }

  render(){

    return(
      React.createElement(React.Fragment, null, 
        React.createElement("p", null, this.props.title), 
         this.renderDescriptionDiv() 
      )
    )
  }


}
;class DropdownBlock extends React.Component{

  constructor( props ){
    super( props )
  }

  renderOption(){

    let options = this.props.dataEntries.map( entry => {
      return ( React.createElement("option", {key: `dataEntry_${entry}`}, entry) )
    })

    return options

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
        React.createElement("select", {
          className: "dropdownList", 
          onChange:  event  => this.props.valueReceived( event.target.value )}, 
          this.renderOption()
        )
      )
    )
  }

}
;class InputBlock extends React.Component{

  constructor( props ){
    super( props )

  }

  render(){

    return(
      React.createElement("div", {className: "inputDiv"}, 
        this.props.children, 
         this.props.size == null ? 
                  React.createElement("input", {onChange:  e => this.props.valueReceived( e.target.value )}) :
                  React.createElement("textarea", {onChange:  e => this.props.valueReceived( e.target.value )})
      )
    )
  }

}
;const TextField = ({ textValue, title }) => {

	let text;
	if( textValue.typeof == "string" ){
		text = textValue
	}
	else {
		text = textValue[ getRandomInt( 0, textValue.length ) ]
	}

	return(
		React.createElement("div", {className: "textFieldDiv"}, 
			React.createElement("h3", null,  title ), 
			React.createElement("p", null,  text )
		)
	)
};const TitleDiv = ({ text }) => {
	
	return(
		React.createElement("div", {className: "titleDiv"}, 
			React.createElement("h3", null,  text )
		)
	)
};class Footer extends React.Component {

  constructor( props ){
    super( props )
  }



  render(){
    return(
      React.createElement("div", {className: "footer"}, 
        React.createElement("button", {onClick:  this.props.goNext}, "next"), 
        React.createElement("button", {onClick:  this.props.logState}, "Log"), 
        React.createElement("button", {onClick:  this.props.pauseState}, " Pause")
      )
    )
  }

}
;class Module_0Year extends React.Component {

  constructor( props ){
    super( props )
    }

  render() {

    return(

      React.createElement("div", {className: "module"}, 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "name", value )}, 
           React.createElement(Description, {title: "Company Name"})
        ), 
        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "companyDescription", value ), 
          size: "large"}, 
           React.createElement(Description, {title: "Description ( Optional )"})
        ), 

        React.createElement(TextField, {title: "First Game", textValue:  secondGameDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameName1", value )}, 
           React.createElement(Description, {title: "Game Name"})
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  genres, 
          valueReceived:  value => this.props.editCompanyState( "genres", value )}, 
          React.createElement(Description, {title:  'Genre', description:  descriptionPlatform })
        ), 

        React.createElement(DropdownBlock, {
          dataEntries:  platforms, 
          valueReceived:  value => this.props.editCompanyState( "platform", value )}, 
          React.createElement(Description, {title:  'Platform' })
        )

      )

    )

  }

}
;class Module_2Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "sentMoneyYear2", value ), 
          size: "large"}, 
           React.createElement(Description, {
              title: "Where to spend the money", 
              description:  descriptionSpentMoney })
        ), 

        React.createElement(TextField, {title: "Focus", textValue:  focusDescription }), 

        React.createElement(TextField, {title: "Second Game", textValue:  secondGameDescription }), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameTitle2", value )}, 
           React.createElement(Description, {
              title: "Game Title"})
        ), 

        React.createElement(InputBlock, {
          valueReceived:  value => this.props.editCompanyState( "gameDescription2", value ), 
          size: "large"}, 
           React.createElement(Description, {
              title: "Game genre, style, mechanics"})
        )

      )
    )

  }

}
;class Module_4Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 5", 
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;class Module_6Year extends React.Component {

  constructor( props ){
    super( props )
  }

  render() {

    return(
      React.createElement("div", {className: "module"}, 
        "YEAR 8",  
        React.createElement("input", {onValue:  e => console.log( e )})
      )
    )

  }

}
;var descriptionPlatform = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Maecenas mauris dolor, lobortis id ipsum vitae, dapibus tincidunt est. Pellentesque mattis
 pretium nisi, sed rutrum lectus faucibus a. Morbi pretium mi tortor. Fusce ac vestibulum diam,
 tempus gravida metus. Pellentesque dictum purus ut lectus tempor fermentum. `

var descriptionSpentMoney = `Making the right decision on the right time is everything. Check what went bad on your recap of the last 2 years
and focus on that. Choose wisely when thinking where to spent the company money. Investing on growing your team is always a good move.
 Check what if you need a new department, like UX/UI Design, new artists, SFX, more developers, someone to promote your game
 and take care of marketing.`

 var secondGameDescription = `Now is a good time to start think in releasing a new game. Do you think your first game went well? If yes, should you go for a 
 second instalment? Or maybe if you wanna change thinks a bit or your last game didnt went so well, you can try a new genre or a new story or a new platform.
 If you wanna go for something different, just try the random roll.`

 var focusDescription = ['option1', 'option2', 'option3'];const genres = [
  'Platform games',
  'Shooter games',
  'Fighting games',
  'Beat em up games',
  'Stealth game',
  'Survival games',
  'Battle royale',
  'Rhythm games',
  'Action-adventure',
  'Survival horror',
  'Metroidvania',
  'Adventure',
  'Role-playing',
  'Action RPG',
  'MMORPG',
  'Roguelikes',
  'First-person party-based RPG',
  'Construction and management simulation',
  'Life simulation',
  'Vehicle simulation',
  'Auto battler (auto chess)',
  'Multiplayer online battle arena (MOBA)',
  'Real-time strategy (RTS)',
  'Real-time tactics (RTT)',
  'Tower defense',
  'Turn-based strategy (TBS)',
  'Turn-based tactics (TBT)',
  'Racing',
  'Sports game',
  'Sports-based fighting',
  'MMO',
  'Party game',
  'Logic game',
  'Idle gaming',
]

const platforms = [
  'PC',
  'Nintendo Switch',
  'PS4',
  'VR',
  'Mobile',
  'Xbox One',
  'NES ( Going full retro )',
  'Nintendo DS / 3DS'
]
;class Timer extends React.Component {
//1800000 30 minutos
  constructor( props ){
    super( props )

    this.timer30Minutes = 6 * 3 //60 * 30
    this.actualTimer = 0

    this.state = {
      year: props.year,
      isTimerPaused: false,
    }

    this.startTime = this.startTime.bind( this )
    this.doTheMath = this.doTheMath.bind( this )
    this.drawYearTiles = this.drawYearTiles.bind( this )
  }

  componentDidMount(){
    this.startTime()
  }

  startTime(){

     if ( this.actualTimer < this.timer30Minutes ) {

        setTimeout( () => {

          if( this.state.isTimerPaused == false ){
            this.actualTimer++;
            this.doTheMath()
          }
           this.startTime();

        }, 1000);

    }
    else this.resetTimer()

  }

  resetTimer(){

    this.actualTimer = 0
    this.props.nextYear()
    this.startTime()

  }

  doTheMath(){
    var valueInPercentage = parseInt( ( this.actualTimer * 100 ) / this.timer30Minutes )

    $('.imageInnerFiller').animate({
        width: valueInPercentage + '%'
    })

    var timerValue = giveMinutesAndSeconds( this.actualTimer )
    this.setState({ timerValue })
  }

  static getDerivedStateFromProps( props, state ) {
    return {
      year: props.year,
      isTimerPaused: props.isTimerPaused,
    }
  }

  drawYearTiles(){

    return(
      React.createElement(React.Fragment, null, 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 2 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 4 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 6 ? 'filled' : '') }`}), 
        React.createElement("div", {className:  `twoYearsBatch ${ (this.state.year >= 8 ? 'filled' : '') }`})
      )
    )

  }

  render(){
    return(
      React.createElement("div", {className: "timer"}, 

        React.createElement("div", {className: "title"}, "Year ",  this.state.year, " of your Company"), 

        React.createElement("div", {className: "imageCounter"}, 
          React.createElement("div", {className: "imageInnerObject"}, 
            React.createElement("div", {className: "firstStep"}
            )

          ), 
          React.createElement("div", {className: "imageInnerFiller"}
          )
        ), 
        React.createElement("div", {className: "totalTimer"}, 
           this.drawYearTiles() 
        ), 
        React.createElement("div", {className: "counter"},  this.state.timerValue)

      )
    )
  }

}
;function giveMinutesAndSeconds( seconds ){
    var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return  minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}

function giveMinutesSecondsAndHours( seconds ){
	var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}


function getRandomInt( min = 1, max ){
    return Math.floor(Math.random() * (max - min + 1) + min);
};ReactDOM.render(
  React.createElement(PageContent, null),
  document.getElementById('content')
);
