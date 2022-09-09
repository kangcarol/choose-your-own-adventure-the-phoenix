
/*-------------------------------- Constants --------------------------------*/

// the indices will correspond to the right environment
const secretPhoenixLocation = []
const secretFeatherLocations = []
const environmentsImgs = [] //maybe unnecessary
const enviromentHints = []

// message variables:
const choiceMessageE1 = ['choice E1-A', 'choice E1-A']
const choiceMessageE2 = ['choice E2-A', 'choice E2-A']
const choiceMessageE3 = ['choice E3-A', 'choice E3-A']

/*-------------------------------- Variables --------------------------------*/

let featherTotal = 0
let environmentGrid

/*------------------------ Cached Element References ------------------------*/

const cellEls = document.querySelectorAll('.cell') // all cells
const messageEl = document.getElementById('message')
const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-btn')
const nextBtn = document.getElementById('next-btn')
const choice1Btn = document.getElementById('choice-btn')
const choice2Btn = document.getElementById('choice2-btn')

// const header = document.querySelector('h1')`


/*----------------------------- Event Listeners -----------------------------*/


startBtn.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

init()

function init (){

  renderEnvironment()
  resetBtn.setAttribute('hidden', true)
  nextBtn.setAttribute('hidden', true)
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
}


  function renderStart(){

  }


  function renderEnvironment(){
    let environmentGrid =[
      null,null,null,null,null,
      null,null,null,null,null,
      null,null,null,null,null,
      null,null,null,null,null,
      null,null,null,null,null,
      ]  // this should be invisible
  }


  function renderStoryOver(){

  }


  function renderConsolation(){

  }


  function renderPhoenixEnd(){

  }


  function handleClickChoice(){

  }


  function handleClickFeather(){

  }


  function handleClickPhoenix(){

  }


  function handleClickReset(){

  }


  function timer(){



  }


/*-------------------------------- FRIDAY/WKEND GOALS --------------------------------*/

  //// Reorgainze pseudocode
  //// Add variables
  //// Set up HTML, buttons, divs, ids, classes
  //// Add cached element references
  //// Set up blank functions for what needs to happen
  // Setup basic CSS so that I can test
  // Write out functions
  // Add event listeners

  //// function init()
  //// function renderStart()
  //// function renderEnvironment()
  //// function renderStoryOver()
  //// function renderConsolation()
  //// function renderPhoenixEnd()
  //// function handleClickChoice()
  //// function handleClickFeather()
  //// function handleClickPhoenix()
  //// function handleClickReset()
  //// function timer()

  //// HTML buttons needed:
    //// start-btn
    //// reset-btn
    //// choice1-btn
    //// choice2-btn
    //// next-btn (at the end, before phoenix screen)


  // Dedicated divs needed:
    // environment (body?)
    //// hint box
    //// feather box


  // Alert needed:
    // resurrection alert


/*------------------------------- NEXT WEEK ----------------------------------------*/


// Timer
// Sound
// Favicon

// Copy of messages/hints


/*----------------------------------------------------------------------------------*/



// START SCREEN:
  // HTML will already have the img source loaded for the start screen.
  // HTML will have a message box
  // HTML will have a start button
  // HTML will have the restart button hidden
  // CSS to have an invisible grid for clicks (to find feather or phoenix)


// SET UP:
  // Create cached element references
  //// Let variable for total number of feathers (that will be increase/decrease as feathers are found or “spent”)
  //// Create const variables for the locations of each of the feathers and phoenix
  //// Grid array for possible locations (like tic tac toe)


// AddListener function for the start button, render:
  // When clicked it will change out the image to the FIRST ENVIRONMENT
  // Message box should change message out to FIRST ENVIRONMENT’s hint
  // Start button should then disappear, reset appear
  // Two choice buttons should appear (this will detail out w description, change w ea new environment)
  // Turn on hover, so that if they are hovering over the hidden location cell of the feather, it’ll glow (?)
  // Feather area (labeled) should appear
  // When feather is found image of feather should appear (like X or O of tic tac toe), then it should move to feather designated area


// AddListener function (target.id) for the two choice buttons:

// It will be if/else conditional:
// If one is clicked will set into motion ENVIRONMENT TWO (similar to above, just don’t have to deal with Start button
// If the other one is clicked, it will check to see if feather variable is greater than zero
  // If so then alert will pop up and tell them they are using one of their feathers for resurrection, after the close alert, takes then to ENVIRONMENT THREE.
  // If feather variable is 0, then window image changes to STORY OVER image


// ENVIRONMENT THREE will follow the same as above but instead of sending you to new environment, will have message screen
  // Remove choice buttons
  // If have 3 feathers, add seek phoenix button, message will be confirming you have 3 feathers and to click button to move forward
  // If less than three, this will be consolation message screen


// PHOENIX SCREEN (environment to look for phoenix)
// When find phoenix, image of phoenix replaces screen with a congratulations


// TIMER !!!!!

// FAVICON
