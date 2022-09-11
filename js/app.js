
/*-------------------------------- Constants --------------------------------*/

const environmentIntro = {
  enviroId: 0,
  image: 'tbd0',
  message: 'mythology message & how to read story',
}

const environment1 = {
  enviroId: 1,
  image: 'tbd',
  message: 'hint 1',
  secretLocation: 0,
  choiceMessageA: 'choice 1A',
  choiceMessageB: 'choice 1B',
}

const environment2 = {
  enviroId: 2,
  image: 'tbd2',
  message: 'hint 2',
  secretLocation: 4,
  choiceMessageA: 'choice 2A',
  choiceMessageB: 'choice 2B',
}

const environment3 = {
  enviroId: 3,
  image: 'tbd3',
  message: 'hint 3',
  secretLocation: 24,
  choiceMessageA: 'choice 3A',
  choiceMessageB: 'choice 3B',
}

const environmentstoryOver = { //environment when story is over
  enviroId: 4,
  image: 'tbd4',
  message: 'story over message ...',
}

const environmentConsolation = { //environment when made alive but < 3 feathers
  enviroId: 5,
  image: 'tbd consolation',
  message: 'consolation message',
}

const environmentPhoenix = { //environment to find phoenix
  enviroId: 6,
  image: 'tbd4',
  message: 'hint for phoenix',
  secretLocation: 7,
}

const environmentCongrats = { //environment w congrats image
  enviroId: 7,
  image: 'tbd4',
  message: 'congrats',
}


  /*-------------------------------- Variables --------------------------------*/

  let featherTotal, enviro, enviroGrid

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

  const mainImg = document.querySelector('.locationCells')

  /*----------------------------- Event Listeners -----------------------------*/

  startBtn.addEventListener('click', handleClickStart)

  cellEls.forEach(cellSelect => { cellSelect.addEventListener('click', handleClickFind)})

  choice1Btn.addEventListener('click', handleClickChoice)
  choice2Btn.addEventListener('click', handleClickChoice)

  resetBtn.addEventListener('click', init)

  /*-------------------------------- Functions --------------------------------*/

  init()

  function init (){
    featherTotal = 0
    enviroGrid = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]

    console.log('INIT',`feather total = ${featherTotal}`)

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
    enviroGrid.forEach((cell,i) => {
      if (cellEls[i].textContent = 'FEATHER'){
        cellEls[i].textContent = null
      }
    })

    // REVERT TO INTRO IMAGE
    mainImg.style.backgroundImage = "url('../images/catherdral.jpg')"

  }

  function handleClickStart(evt){
    renderEnvironment()
    //todo START TIMER
    console.log("START", `feather total = ${featherTotal}`) //! delete later
  }

  function renderEnvironment(){
    enviro = environment1 // to change out
    enviroGrid[enviro.secretLocation] = 'feather'
    //todo IMAGE -> change out to Environment-1 image
    //todo MESSAGE -> change out to Environment-1 hint message
    // BUTTONS -> hide START button, show all other buttons
    // FEATHER-BOX -> show
    // TIMER -> show
    startBtn.setAttribute('hidden', true)
    resetBtn.removeAttribute('hidden')
    choice1Btn.removeAttribute('hidden')
    choice2Btn.removeAttribute('hidden')
    featherBox.removeAttribute('hidden')
    timerArea.removeAttribute('hidden')
  }

  function handleClickFind(evt){
    // FEATHER
    // player finds cell (handleClickFind) that feather is assigned for THIS environment by clicking on cell.
    // when cell is clicked, the feather image will appear over image, and then it disappears and reappears in the feather box in next environment, and feather count increases
    const sqIdx = parseInt(evt.target.id.replace('c', ''))

    if (enviroGrid[sqIdx] === 'feather'){
      let locationCell = cellEls[sqIdx]
      locationCell.textContent = 'FEATHER'
      locationCell.style.color = 'red'
      //todo locationCell.className = 'animate__animated animate__ANIMATION-NAME'
      featherTotal += 1
      console.log('AFTER FIND feather total', `${featherTotal}`) //! delete later
      enviroGrid = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
      //todo refactor enviroGrid later, and the id's for cellEle's
      // this is so that feather count does not continue to increase by clicking the same cell
      //todo figure out how to loop each environment change
  }
}

  function handleClickChoice(evt){
 //todo CHOICE BUTTONS (MAth.random the buttons??)
    // if player clicks on CHOICE button1 for Enviroment1, it will change renderEnvironment for Environment2
    // if player clicks on CHOICE button2, it will check if featherTotal > 0,
      // if greater than 0, an alert pops up saying that they had chosen a fatal situation but their feather has granted them another life. After player clicks OK it will take them to Environment2
      // if feather is less than 0, will take them to StoryOver
    if (evt.target.id === 'choice1-btn'){
      console.log('CHOICE 1')
      environment = environment2 //todo change out to new img/hint/secretLocation
    }else if (evt.target.id === 'choice2-btn'){
      console.log('CHOICE 2')
      if (featherTotal > 0){
        alert('You have chosen a FATAL scenerio, but you have a feather in your bank to grant you another life!')
        featherTotal -= 1
        //todo remove the visual feather from the feather box
        console.log('SPEND FEATHER feather total', `${featherTotal}`) //! delete later
        renderStoryOver()
      } else{
        renderStoryOver()
      }
    }
  }


  function renderStoryOver(){
  // IMAGE -> change out to StoryOver image
  // MESSAGE -> change out to StoryOver message
  // BUTTONS -> hide all buttons, except reset
  // FEATHER-BOX -> show (????)
  // TIMER -> hide
    console.log("RENDER STORY OVER")
    enviroGrid.forEach((cell,i) => {
      if (cellEls[i].textContent = 'FEATHER'){
        cellEls[i].textContent = null
      }
    })
    choice1Btn.setAttribute('hidden', true)
    choice2Btn.setAttribute('hidden', true)
    featherBox.setAttribute('hidden', true)
    timerArea.setAttribute('hidden', true)
    mainImg.style.backgroundImage = "url('../images/forest.png')"

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

  function timer(){
  }


/*-------------------------------- FRIDAY/WKEND GOALS --------------------------------*/

  //todo changing out environments as loop ??????
  //todo ADD Hover
  //todo ADD timer

  //todo research phoenix mythology for images/sounds
  //todo find images BLACK & WHITE LINE DRAWINGS ???



/*------------------------------- NEXT WEEK ----------------------------------------*/

// Images & copywrite the hints
// Copy of messages/hints
// TIMER

// Font
// Add HOVER feature
// Add animation
// Sound
//! Make sure image doesn't get distored



/*----------------------------------------------------------------------------------*/



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
