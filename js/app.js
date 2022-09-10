
/*-------------------------------- Constants --------------------------------*/

// the indices will correspond to the right environment
const secretPhoenixLocation = []
const secretFeatherLocations = [] // for each environment, needs to work with renderEnvironment function below
const environmentsImgs = [] //maybe unnecessary
const enviromentHints = ["hint1","hint2","hint3"]

// message variables:
const choiceMessageE1 = ['choice E1-A', 'choice E1-A']
const choiceMessageE2 = ['choice E2-A', 'choice E2-A']
const choiceMessageE3 = ['choice E3-A', 'choice E3-A']

/*-------------------------------- Variables --------------------------------*/

let environmentNum = 3 // MAKE DYNAMIC
let featherTotal = 0
let environmentGrid

/*------------------------ Cached Element References ------------------------*/

const cellEls = document.querySelectorAll('.cell') // all cells

const messageEl = document.getElementById('message')
const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-btn')
const nextBtn = document.getElementById('next-btn')
const choice1Btn = document.getElementById('choice1-btn')
const choice2Btn = document.getElementById('choice2-btn')

const featherBox = document.getElementById('feather-box')
const timerArea = document.getElementById('timer-area')

const mainImg = document.getElementById('main-img')

/*----------------------------- Event Listeners -----------------------------*/


startBtn.addEventListener('click', handleClickStart)

cellEls.forEach(function(cellSelect) {
  cellSelect.addEventListener('click', handleClickFind)
})

resetBtn.addEventListener('click', init) // maybe start elsewhere, further in?


/*-------------------------------- Functions --------------------------------*/

init()

function init (){
  // *** After functioning, refactor the environmentGrid, and the cell IDs ***
  environmentGrid = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  console.log("init!!!")
  // Upon loading page, it should show image of phoenix and intro message
  // IMAGE -> Phoenix intro drawing
  // MESSAGE -> intro about phoenix mythology & how the game works
  // BUTTONS -> only START button should be visible, hide all others
  // FEATHER-BOX -> hidden
  // TIMER -> hidden
  startBtn.removeAttribute('hidden')
  resetBtn.setAttribute('hidden', true)
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  featherBox.setAttribute('hidden', true)
  timerArea.setAttribute('hidden', true)

  // CLEAR PREVIOUSLY FOUND FEATHERS
  environmentGrid.forEach((cell,i) => {
    if (cellEls[i].textContent = 'phx'){
      cellEls[i].textContent = ''
    }
  })

   // CLEAR TIMER



}

function handleClickStart(evt){
  renderEnvironment()
  console.log("START")
}

function renderEnvironment(){
  // IMAGE -> change out to Environment-1 image
  // MESSAGE -> change out to Environment-1 hint message
  // BUTTONS -> hide START button, show all other buttons
  // FEATHER-BOX -> show
  // TIMER -> show
  startBtn.setAttribute('hidden', true)
  resetBtn.removeAttribute('hidden')
  choice1Btn.removeAttribute('hidden')
  choice2Btn.removeAttribute('hidden')
  featherBox.removeAttribute('hidden')
  timerArea.removeAttribute('hidden')

  // ASSIGN FEATHER LOCATION PER ENVIRONMENT
  if (environmentNum === 1){
    environmentGrid[0] = 'feather'
  } else if (environmentNum === 2){
    environmentGrid[4] = 'feather'
  } else if (environmentNum === 3){
    environmentGrid[24] = 'feather'
  }

  // FIND FEATHER
  handleClickFind()

  // CHOICE BUTTONS
  handleClickChoice()
}

function handleClickFind(evt){
   // FEATHER
     // player finds cell (handleClickFind) that feather is assigned for THIS environment by clicking on cell.
     // when cell is clicked, the feather image will appear over image, and then it disappears and reappears in the feather box in next environment, and feather count increases
  const sqIdx = parseInt(evt.target.id.replace('c', ''))

  environmentGrid.forEach((cell,i) => {
  if (environmentGrid[sqIdx] === 'feather'){
    let locationCell = cellEls[sqIdx]
    locationCell.textContent = 'phx'
    locationCell.style.color = 'red'
    featherTotal += 1
    console.log(featherTotal)
    // environmentGrid[i].className = 'animate__animated animate__zoomIn'
  }
})
}




    // the location cell cannot be clicked again to add more than 1 feather during that environment
    // const sqIdx = parseInt(evt.target.id.replace('c', ''))


  function renderStoryOver(){
  // IMAGE -> change out to StoryOver image
  // MESSAGE -> change out to StoryOver message
  // BUTTONS -> hide all buttons, except reset
  // FEATHER-BOX -> show (????)
  // TIMER -> hide
  }

  function renderConsolation(){
  // IMAGE -> change out to Consolation image
  // MESSAGE -> change out to Consolation message
  // BUTTONS -> hide all buttons, except reset
  // FEATHER-BOX -> show (????)
  // TIMER -> hide
  }

  function renderPhoenixEnd(){
  // IMAGE -> change out to final Environment image to find phoenix
  // MESSAGE -> change out to hint to find phoenix
  // BUTTONS -> hide all buttons, except reset
  // FEATHER-BOX -> hide
  // TIMER -> show

  // if find phoenix (by handleCickFind) show the phoenix and change out message to Congratulations! (add animation, and sound?)


  }

  function handleClickChoice(evt){
 // CHOICE BUTTONS (MAth.random the buttons??)
    // if player clicks on CHOICE button1 for Enviroment1, it will change renderEnvironment for Environment2
    // if player clicks on CHOICE button2, it will check if featherTotal > 0,
      // if greater than 0, an alert pops up saying that they had chosen a fatal situation but their feather has granted them another life. After player clicks OK ("phew") it will take them to Environment2
      // if feather is less than 0, will take them to StoryOver

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
  //// Add event listeners

  //// function init()
  //// function renderStart()
  //// function renderEnvironment()
  //// function renderStoryOver()
  //// function renderConsolation()
  //// function renderPhoenixEnd()
  //// function handleClickChoice()
  //// function handleClickFind()
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

// Images & copywrite the hints
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
  //// Create cached element references
  //// Let variable for total number of feathers (that will be increase/decrease as feathers are found or “spent”)
  //// Create const variables for the locations of each of the feathers and phoenix
  //// Grid array for possible locations (like tic tac toe)


// AddListener function for the start button, render:
  // When clicked it will change out the image to the FIRST ENVIRONMENT
  // Message box should change message out to FIRST ENVIRONMENT’s hint
  // Start button should then disappear, reset appear
  // Two choice buttons should appear (this will detail out w description, change w ea new environment)
  // Turn on hover, so that if they are hovering over the hidden location cell of the feather, it’ll glow (?)


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
