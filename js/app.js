
/*-------------------------------- Constants --------------------------------*/
enviroArrays =[
{ enviroName: 'enviroIntro',
  enviroId: 0,
  image: "url('../images/Phoenix-Fabelwesen.jpeg')",
  message: '"The phoenix is an immortal bird associated with Greek mythology (with analogs in many cultures) that cyclically regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor." -- Wikipedia',
},

{ enviroName: 'enviro1',
  enviroId: 1,
  image: "url('../images/Enviro1Volcano.png')",
  message: 'Some legends say it dies in a show of flames and combustion, others that it simply dies and decomposes before being born again. -- Wikipedia',
  secretLocation: 8,
  choiceMessageA: 'choice 1A',
  choiceMessageB: 'choice 1B',
},

{ enviroName: 'enviro2',
  enviroId: 2,
  image: "url('../images/forest.png')",
  message: 'hint 2',
  secretLocation: 4,
  choiceMessageA: 'choice 2A',
  choiceMessageB: 'choice 2B',
},

{ enviroName: 'enviro3',
  enviroId: 3,
  image: 'tbd3',
  message: 'hint 3',
  secretLocation: 24,
  choiceMessageA: 'choice 3A',
  choiceMessageB: 'choice 3B',
},

{ enviroName: 'enviroStoryOver', //environment when story is over
  enviroId: 4,
  image: "url('../images/StoryOverPlaceholder.png')",
  message: 'story over message ...',
},

{ enviroName: 'enviroConsolation',  //environment when alive but < 3 feathers
  enviroId: 5,
  image: 'tbd consolation',
  message: 'consolation message',
},

{ enviroName: 'enviroPhoenix',  //environment to find phoenix
  enviroId: 6,
  image: 'tbd4',
  message: 'hint for phoenix',
  secretLocation: 7,
},

{ enviroName: 'environCongrats',  //environment w congrats image
  enviroId: 7,
  image: 'tbd4',
  message: 'congrats',
}
]

  /*-------------------------------- Variables --------------------------------*/

  let featherTotal, enviroGrid


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

    // CLEAR PREVIOUSLY FOUND FEATHERS
    enviroGrid.forEach((cell,i) => {
      if (cellEls[i].textContent = 'FEATHER'){
        cellEls[i].textContent = null
      }
    })

    // LOADING & RESET WILL REVERT TO INTRO IMAGE & MESSAGE
    mainImg.style.backgroundImage = enviroArrays[0].image
    messageEl.textContent = enviroArrays[0].message

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
  }

  function handleClickStart(evt){
    renderEnvironment()
    //todo START TIMER
    console.log("START", `feather total = ${featherTotal}`) //! delete later
  }

  function renderEnvironment(){
    let enviro = enviroArrays[1]
    enviroGrid[enviro.secretLocation] = 'feather'
    //todo IMAGE -> change out to Environment-1 image
    mainImg.style.backgroundImage = enviro.image
    //todo MESSAGE -> change out to Environment-1 hint message
    messageEl.textContent = enviro.message
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
    // if player clicks on CHOICE button1 for Enviroment1, it will change renderEnvironment for Environment2
    // if player clicks on CHOICE button2, it will check if featherTotal > 0,
    // if greater than 0, an alert pops up saying that they had chosen a fatal situation but their feather has granted them another life. After player clicks OK it will take them to Environment2
    // if feather is less than 0, will take them to StoryOver
    if (evt.target.id === 'choice1-btn'){
      console.log('CHOICE 1')
      enviro = (enviroArrays.find(obj => obj.enviroId === 2)) // change to enviro2
      //todo change out to new img/hint/secretLocation/choice btn descriptions
      renderEnvironment(enviro)
    }else if (evt.target.id === 'choice2-btn'){
      console.log('CHOICE 2')
      if (featherTotal > 0){
        alert('You have chosen a FATAL scenerio, but you have a feather in your bank to grant you another life!')
        featherTotal -= 1
        //todo remove the visual feather from the feather box
        console.log('SPEND FEATHER feather total', `${featherTotal}`) //! delete later
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
    // Clear out the feather found on visual
    console.log("RENDER STORY OVER")

    enviroGrid.forEach((cell,i) => {
      if (cellEls[i].textContent = 'FEATHER'){
        cellEls[i].textContent = null
      }
    })

    mainImg.style.backgroundImage = enviroArrays[4].image
    messageEl.textContent = enviroArrays[4].message
    choice1Btn.setAttribute('hidden', true)
    choice2Btn.setAttribute('hidden', true)
    featherBox.setAttribute('hidden', true)
    timerArea.setAttribute('hidden', true)

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
  //todo ADD Hover, glow animation?
  //todo ADD timer

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
