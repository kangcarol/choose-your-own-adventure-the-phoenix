
/*-------------------------------- Constants --------------------------------*/
enviroArrays = [
  { enviroName: 'enviroIntro',
    image: "url('../images/Phoenix-Fabelwesen.jpeg')",
    message: '"The phoenix is an immortal bird associated with Greek mythology (with analogs in many cultures) that cyclically regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor." -- Wikipedia',
  },
  { enviroName: 'enviro1',
    image: "url('../images/Enviro1Volcano.png')",
    message: 'Some legends say it dies in a show of flames and combustion, others that it simply dies and decomposes before being born again. -- Wikipedia',
    secretLocation: 8,
    choiceMessage1: 'CAVE',
    choiceMessage2: 'MOUNTAINS',
  },
  { enviroName: 'enviro2',
    image: "url('../images/Enviro2Cave.png')",
    message: 'hint 2',
    secretLocation: 0,
    choiceMessage1: 'CATACOMBS',
    choiceMessage2: 'SEA',
  },
  { enviroName: 'enviro3',
    image: "url('../images/Enviro3Catacombs.png')",
    message: 'hint 3',
    secretLocation: 4,
    // choiceMessage1: 'choice 3A',
    // choiceMessage2: 'choice 3B',
  },
  { enviroName: 'enviroStoryOver', //environment when story is over
    image: "url('../images/StoryOverPlaceholder.png')",
    message: 'You made a FATAL choice, and with zero feathers in your nest to resurrect you, it is the end.',
  },
  { enviroName: 'enviroConsolation',  //environment when alive but < 3 feathers
    image: "url('../images/Phoenix-Fabelwesen.jpeg')",
    message: `You need 3 feathers to move forward to find the phoenix, but at least you're still alive! Try again`,
  },
  { enviroName: 'enviroPhoenix',  //environment to find phoenix
    image: "url('../images/Enviro4FindPhoenix.png')",
    message: 'find phoenix message',
    secretLocation: 10,
  },
  { enviroName: 'environCongrats',  //environment w congrats image
    image: 'tbd4',
    message: 'congrats',
  }
]

/*-------------------------------- Variables --------------------------------*/

let featherTotal, enviroGrid, enviro

/*------------------------ Cached Element References ------------------------*/

const cellEls = document.querySelectorAll('.cell') // all cells

const messageEl = document.getElementById('message')
const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-btn')
const findPhxBtn = document.getElementById('find-phx-btn')

const choice1Btn = document.getElementById('choice1-btn')
const choice2Btn = document.getElementById('choice2-btn')

const choice1BtnAlt = document.getElementById('choice1-btn-alt')
const choice2BtnAlt = document.getElementById('choice2-btn-alt')

const featherBox = document.getElementById('feather-box')
const timerArea = document.getElementById('timer-area')

const mainImg = document.querySelector('.locationCells')

/*----------------------------- Event Listeners -----------------------------*/

startBtn.addEventListener('click', handleClickStart)

cellEls.forEach(cellSelect => { cellSelect.addEventListener('click', handleClickFind)})

choice1Btn.addEventListener('click', handleClickChoice)
choice2Btn.addEventListener('click', handleClickChoice)

choice1BtnAlt.addEventListener('click', handleClickChoiceAlt)
choice2BtnAlt.addEventListener('click', handleClickChoiceAlt)

findPhxBtn.addEventListener('click', handleClickPhoenix)

resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init (){
  featherTotal = 0
  enviroGrid = new Array (25,null)

  console.log('INIT',`feather total = ${featherTotal}`)

  // CLEAR PREVIOUSLY FOUND FEATHERS
  cellEls.forEach(cell => cell.textContent ='')

  // LOADING & RESET WILL REVERT TO INTRO IMAGE & MESSAGE
  mainImg.style.backgroundImage = enviroArrays[0].image
  messageEl.textContent = enviroArrays[0].message

  startBtn.removeAttribute('hidden')
  resetBtn.setAttribute('hidden', true)
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
  findPhxBtn.setAttribute('hidden', true)
  featherBox.setAttribute('hidden', true)
  timerArea.setAttribute('hidden', true)

  enviro = enviroArrays[1]
}

function handleClickStart(evt){
  renderEnvironment()
  //todo START TIMER
  console.log("START", `feather total = ${featherTotal}`) //! delete later
}

function renderEnvironment(){
  startBtn.setAttribute('hidden', true)
  resetBtn.removeAttribute('hidden')
  choice1Btn.removeAttribute('hidden')
  choice2Btn.removeAttribute('hidden')
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
  featherBox.removeAttribute('hidden')
  timerArea.removeAttribute('hidden')
  enviroGrid[enviro.secretLocation] = 'feather'
  // IMAGE -> change out to Environment-1 image
  mainImg.style.backgroundImage = enviro.image
  // MESSAGE -> change out to Environment-1 hint message
  messageEl.textContent = enviro.message
  // CHOICE BUTTONS -> descriptions change out
  choice1Btn.textContent = enviro.choiceMessage1
  choice2Btn.textContent = enviro.choiceMessage2
  choice1BtnAlt.textContent = enviro.choiceMessage1
  choice2BtnAlt.textContent = enviro.choiceMessage2
}

function clearFoundFeathers(){
  cellEls.forEach(cell => cell.textContent ='')
}

function handleClickFind(evt){
  // FEATHER
    // player finds cell (handleClickFind) that feather is assigned for THIS environment by clicking on cell.
    // when cell is clicked, the feather image will appear over image, and then it disappears and reappears in the feather box in next environment, and feather count increases
  const cellIdx = parseInt(evt.target.id.replace('c', ''))

  if (enviroGrid[cellIdx] === 'feather'){
    let locationCell = cellEls[cellIdx]
    locationCell.textContent = 'FOUND'
    locationCell.style.color = 'red'
    //todo locationCell.className = 'animate__animated animate__ANIMATION-NAME'
    featherTotal += 1
    //todo add feather icon in feather-box
    console.log('AFTER FIND feather total', `${featherTotal}`) //! delete later
    enviroGrid = new Array (25,null) // this is so that feather count does not continue to increase by clicking the same cell
  }
  if (featherTotal === 3){
    findPhxBtn.removeAttribute('hidden')
  } else if ((featherTotal < 3) && enviro === enviroArrays[3]){
    // setInterval(renderConsolation(),4000)
    renderConsolation()
  }
}

function handleClickChoice(evt){
  //todo clear out feather icon
  // CLEAR PREVIOUSLY FOUND FEATHERS
  cellEls.forEach(cell => cell.textContent ='')

  if (evt.target.id === 'choice1-btn'){
    console.log('CHOICE 1')
    enviro = enviroArrays[2]
    renderEnvironment()

  }else if (evt.target.id === 'choice2-btn'){
    console.log('CHOICE 2')
    if (featherTotal > 0){
      alert('You have chosen a FATAL scenerio, but you have a feather in your bank to grant you another life!')
      featherTotal -= 1
      //todo remove the visual feather from the feather box
      console.log('SPEND FEATHER feather total', `${featherTotal}`) //! delete later
      enviro = enviroArrays[2]
      renderEnvironment()
    } else {
      renderStoryOver()
    }
  }
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.removeAttribute('hidden')
  choice2BtnAlt.removeAttribute('hidden')
}

function handleClickChoiceAlt(evt){
  //todo clear out feather icon
  clearFoundFeathers()

  if (evt.target.id === 'choice1-btn-alt'){
    console.log('CHOICE 1')
    enviro = enviroArrays[3]
    renderEnvironment()

  }else if (evt.target.id === 'choice2-btn-alt'){
    console.log('CHOICE 2')
    if (featherTotal > 0){
      alert('You have chosen a FATAL scenerio, but you have a feather in your bank to grant you another life!')
      featherTotal -= 1
      //todo remove the visual feather from the feather box
      console.log('SPEND FEATHER feather total', `${featherTotal}`) //! delete later
      enviro = enviroArrays[3]
      renderEnvironment()
    } else {
      renderStoryOver()
    }
  }
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
}

function renderStoryOver(){
  // IMAGE -> change out to StoryOver image
  // MESSAGE -> change out to StoryOver message
  // BUTTONS -> hide all buttons, except reset
  // FEATHER-BOX -> show
  //todo TIMER -> hide
  //todo clear out feather icon
  console.log("RENDER STORY OVER")

  // CLEAR PREVIOUSLY FOUND FEATHERS
  cellEls.forEach(cell => cell.textContent ='')

  mainImg.style.backgroundImage = enviroArrays[4].image
  messageEl.textContent = enviroArrays[4].message
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
  timerArea.setAttribute('hidden', true)

}

function renderConsolation(){
  clearFoundFeathers()
  enviro = enviroArrays[5]
  renderEnvironment()
  startBtn.setAttribute('hidden', true)
  resetBtn.removeAttribute('hidden')
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
  findPhxBtn.setAttribute('hidden', true)
  featherBox.removeAttribute('hidden')
  timerArea.setAttribute('hidden', true)
}

function handleClickPhoenix(){
  clearFoundFeathers()

  enviro = enviroArrays[6]
  renderEnvironment()
  startBtn.setAttribute('hidden', true)
  resetBtn.removeAttribute('hidden')
  choice1Btn.setAttribute('hidden', true)
  choice2Btn.setAttribute('hidden', true)
  choice1BtnAlt.setAttribute('hidden', true)
  choice2BtnAlt.setAttribute('hidden', true)
  findPhxBtn.setAttribute('hidden', true)
  featherBox.setAttribute('hidden', true)
  timerArea.setAttribute('hidden', true)

}


function timer(){
}


/*-------------------------------- FRIDAY/WKEND GOALS --------------------------------*/

//todo ADD Hover, glow animation?
//todo ADD timer

//todo changing out environments as loop ??????
//todo research phoenix mythology for images/sounds
//todo find images BLACK & WHITE LINE DRAWINGS ???

//todo CHOICE BUTTONS (MAth.random the buttons??)
//todo


/*------------------------------- NEXT WEEK ----------------------------------------*/

//todo NEXT WEEK
//todo Images & copywrite the hints
//todo Copy of messages/hints
//todo TIMER

//todo Font
//todo Add HOVER feature
//todo Add animation
//todo Sound
//todo README

//todo check indentation
//todo delete console.logs and unnecessary comments
//! Make sure image doesn't get distored

/*----------------------------------------------------------------------------------*/

// ENVIRONMENT THREE will follow the same as above but instead of sending you to new environment, will have message screen
  // Remove choice buttons
  // If have 3 feathers, add seek phoenix button, message will be confirming you have 3 feathers and to click button to move forward
  // If less than three, this will be consolation message screen


// PHOENIX SCREEN (environment to look for phoenix)
// When find phoenix, image of phoenix replaces screen with a congratulations
