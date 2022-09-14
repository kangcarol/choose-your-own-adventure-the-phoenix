/*-------------------------------- Constants --------------------------------*/
enviroArrays = [
  {
    enviroName: "enviroIntro",
    image: "url('../images/Phoenix-Fabelwesen.jpeg')",
    message:
      '"The phoenix is an immortal bird associated with Greek mythology (with analogs in many cultures) that cyclically regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor." - Wikipedia',
  },
  {
    enviroName: "enviro1",
    image: "url('../images/Enviro1Volcano.png')",
    message:
      "Some legends say it dies in a show of flames and combustion, others that it simply dies and decomposes before being born again. -- Wikipedia",
    secretLocation: randomLocation(),
    choiceMessage1: "CAVE",
    choiceMessage2: "MOUNTAINS",
  },
  {
    enviroName: "enviro2",
    image: "url('../images/Enviro2Cave.png')",
    message: "hint 2",
    secretLocation: randomLocation(),
    choiceMessage1: "CATACOMBS",
    choiceMessage2: "SEA",
  },
  {
    enviroName: "enviro3",
    image: "url('../images/Enviro3Catacombs.png')",
    message: "hint 3",
    secretLocation: randomLocation(),
  },
  {
    enviroName: "enviroStoryOver", //environment when story is over
    image: "url('../images/StoryOverPlaceholder.png')",
    message:
    "You made a FATAL choice, and with zero feathers in your nest to resurrect you, it is the end.",
  },
  {
    enviroName: "enviroConsolation", //environment when alive but < 3 feathers
    image: "url('../images/ConsolationPlaceholder.png')",
    message: `You need 3 feathers to move forward to find the phoenix, but at least you're still alive! Try again`,
  },
  {
    enviroName: "enviroPhoenix", //environment to find phoenix
    image: "url('../images/Enviro4FindPhoenix.png')", //! FIND A BETTER IMAGE
    message: "find phoenix message",
    secretLocation: randomLocation(),
  },
  {
    enviroName: "enviro5Resurrection",
    image: "url('../images/resurrection.png')",
    message: "You have chosen a FATAL scenerio, but you have a feather in your bank to grant you another life!",
  },
  {
    enviroName: "enviroOutOfTime", // timer ran out
    image: "url('../images/StoryOverPlaceholder.png')",
    message: 'You ran out of time! Story over!',
  },
]

/*-------------------------------- Variables --------------------------------*/

let featherTotal, enviro, timer
let enviroGrid = new Array(25, null)

/*------------------------ Cached Element References ------------------------*/

const cellEls = document.querySelectorAll(".cell") // all cells

const headerPhx = document.getElementById("title")
const messageEl = document.getElementById("message")
const startBtn = document.getElementById("start-btn")
const resetBtn = document.getElementById("reset-btn")
const findPhxBtn = document.getElementById("find-phx-btn")

const choice1Btn = document.getElementById("choice1-btn")
const choice2Btn = document.getElementById("choice2-btn")

const choice1BtnAlt = document.getElementById("choice1-btn-alt")
const choice2BtnAlt = document.getElementById("choice2-btn-alt")

const featherHeader = document.getElementById("feather-header")
const featherBox = document.getElementById("feather-box")

const timerArea = document.getElementById("timer-area")

const mainImg = document.querySelector(".locationCells")

const wings = new Audio("../audio/wings.mp3")
const animateObj = document.getElementById('imgAnimate')

/*----------------------------- Event Listeners -----------------------------*/

startBtn.addEventListener("click", handleClickStart)

cellEls.forEach((cellSelect) => {
  cellSelect.addEventListener("click", handleClickFind)
})

cellEls.forEach((cellSelect,i) => {
    cellSelect.addEventListener("mouseover", handleHover)
})

choice1Btn.addEventListener("click", handleClickChoice)
choice2Btn.addEventListener("click", handleClickChoice)

choice1BtnAlt.addEventListener("click", handleClickChoiceAlt)
choice2BtnAlt.addEventListener("click", handleClickChoiceAlt)

findPhxBtn.addEventListener("click", handleClickPhoenix)

resetBtn.addEventListener("click", init)

startBtn.addEventListener("click", function(evt){
  wings.volume = .12
  wings.play()
  })

cellEls.forEach((cell) => {
  cell.addEventListener("click", function(evt){
    wings.volume = .12
    wings.play()
  })
})

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  resetTimer()
  clearHoverColor()
  clearFoundFeathers()
  // clearAnimation()

  featherTotal = 0
  featherBox.textContent = featherTotal
  enviroGrid = new Array(25, null)
  console.log("INIT", `feather total = ${featherTotal}`) //! delete this later

  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  // LOADING & RESET WILL REVERT TO INTRO IMAGE & MESSAGE
  mainImg.style.backgroundImage = enviroArrays[0].image
  messageEl.textContent = enviroArrays[0].message

  startBtn.removeAttribute("hidden")
  resetBtn.setAttribute("hidden", true)
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  findPhxBtn.setAttribute("hidden", true)
  featherHeader.setAttribute("hidden", true)
  featherBox.setAttribute("hidden", true)
  timerArea.setAttribute("hidden", true)

  enviro = enviroArrays[1]
}

function handleClickStart(evt) {
  renderEnvironment()
  console.log("START", `feather total = ${featherTotal}`) //! delete later
  startTimer()
  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"
  console.log('SECRET LOCATION INIT: ', enviro.secretLocation) //! delete later
}

function renderEnvironment() {
  startBtn.setAttribute("hidden", true)
  resetBtn.removeAttribute("hidden")
  choice1Btn.removeAttribute("hidden")
  choice2Btn.removeAttribute("hidden")
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  featherHeader.removeAttribute("hidden")
  featherBox.removeAttribute("hidden")
  timerArea.removeAttribute("hidden")
  featherBox.textContent = featherTotal

  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  mainImg.style.backgroundImage = enviro.image
  messageEl.textContent = enviro.message;
  choice1Btn.textContent = enviro.choiceMessage1
  choice2Btn.textContent = enviro.choiceMessage2
  choice1BtnAlt.textContent = enviro.choiceMessage1
  choice2BtnAlt.textContent = enviro.choiceMessage2
}

function handleHover(evt){
  const cellIdx2 = parseInt(evt.target.id.replace("c", ""))
  if (enviroGrid[cellIdx2] === "found") {
    evt.target.classList.add('.mask')
    evt.target.classList.add('.overlay')
    evt.target.style.backgroundColor = 'rgba(249, 49, 84, 0.2)'
  }
}

function clearHoverColor(){
  cellEls.forEach((cell,i) => {
    cell.classList.remove('.mask')
    cell.classList.remove('.overlay')
    cell.removeAttribute('style')
  })
}

function handleClickFind(evt) {
  // player finds cell (handleClickFind) that feather is assigned for THIS environment by clicking on cell.

  const cellIdx = parseInt(evt.target.id.replace("c", ""))

  if (enviroGrid[cellIdx] === "found") {
    let locationCell = cellEls[cellIdx]
    locationCell.classList.add('featherImg')

    clearHoverColor()

    if (enviro !== enviroArrays[6]){
      featherTotal += 1
    }
    featherBox.textContent = featherTotal
    console.log("AFTER FIND feather total", `${featherTotal}`); //! delete later
    enviroGrid = new Array(25, null); // this is so that feather count does not continue to increase by clicking the same cell
  }

  if (featherTotal === 3) {
    findPhxBtn.removeAttribute("hidden")
  } else if (featherTotal < 3 && enviro === enviroArrays[3]) {
    renderConsolation()
  }

  // PHX ENVIRO SPECIFICATIONS
  if (enviro === enviroArrays[6]){
    findPhxBtn.setAttribute('hidden', true)
    resetTimer()
    messageEl.textContent = "Congratulations!"
    clearFoundFeathers()
    animateObj.removeAttribute('hidden')
    animate()
  }
}

function handleClickChoice(evt) {
  clearFoundFeathers()

  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"

  console.log('SECRET LOCATION NEXT2: ', enviro.secretLocation)  //! delete later

  if (evt.target.id === "choice1-btn") {
    console.log("CHOICE 1") //! delete later
    enviro = enviroArrays[2]
    renderEnvironment()
  } else if (evt.target.id === "choice2-btn") {
    console.log("CHOICE 2")  //! delete later
    if (featherTotal > 0) {
      window.open(href="../images/resurrection.png",'popUpWindow','height=200,width=200,left=100,top=100,resizable=yes,scrollbars=no,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      featherTotal -= 1
      featherBox.textContent = featherTotal
      console.log("SPEND FEATHER feather total", `${featherTotal}`) //! delete later
      enviro = enviroArrays[2]
      renderEnvironment()
      enviro.secretLocation = randomLocation()
    } else {
      renderStoryOver()
    }
  }
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.removeAttribute("hidden")
  choice2BtnAlt.removeAttribute("hidden")
}

function handleClickChoiceAlt(evt) {
  clearFoundFeathers()

  enviroGrid[enviro.secretLocation] = "found"
  console.log('SECRET LOCATION NEXT3: ', enviro.secretLocation) //! delete later

  if (evt.target.id === "choice1-btn-alt") {
    console.log("CHOICE 1")  //! delete later
    enviro = enviroArrays[3]
    renderEnvironment()
  } else if (evt.target.id === "choice2-btn-alt") {
    console.log("CHOICE 2")  //! delete later
    if (featherTotal > 0) {
      window.open(href="../images/resurrection.png",'popUpWindow','height=200,width=200,left=100,top=100,resizable=yes,scrollbars=no,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      featherTotal -= 1
      featherBox.textContent = featherTotal
      console.log("SPEND FEATHER feather total", `${featherTotal}`) //! delete later
      enviro = enviroArrays[3]
      renderEnvironment()
    } else {
      renderStoryOver()
    }
  }
    choice1Btn.setAttribute("hidden", true)
    choice2Btn.setAttribute("hidden", true)
    choice1BtnAlt.setAttribute("hidden", true)
    choice2BtnAlt.setAttribute("hidden", true)
}

function renderStoryOver() {
  resetTimer()
  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')
  clearFoundFeathers()

  mainImg.style.backgroundImage = enviroArrays[4].image
  messageEl.textContent = enviroArrays[4].message
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  timerArea.setAttribute("hidden", true)
}

function renderTimerDone() {
  resetTimer()
  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')
  clearFoundFeathers()

  mainImg.style.backgroundImage = enviroArrays[8].image
  messageEl.textContent = enviroArrays[8].message
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  featherBox.setAttribute("hidden", true)
  featherHeader.setAttribute("hidden", true)
}

function renderConsolation() {
  clearFoundFeathers()
  resetTimer()
  enviro = enviroArrays[5]

  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  renderEnvironment()
  startBtn.setAttribute("hidden", true)
  resetBtn.removeAttribute("hidden")
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  findPhxBtn.setAttribute("hidden", true)
  featherBox.removeAttribute("hidden")
  timerArea.setAttribute("hidden", true)
}

function handleClickPhoenix() {
  clearFoundFeathers()

  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"
  console.log('SECRET LOCATION PHOENIX ', enviro.secretLocation) //! delete later

  enviro = enviroArrays[6]
  renderEnvironment()
  startBtn.setAttribute("hidden", true)
  resetBtn.removeAttribute("hidden")
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  findPhxBtn.setAttribute("hidden", true)
  featherBox.setAttribute("hidden", true)
  featherHeader.setAttribute('hidden', true)
  timerArea.setAttribute("hidden", true)
}

function startTimer(){
  let countdownEl = document.getElementById("timer-area")
  let timeLeft = 60

  timer = setInterval(function () {
    countdownEl.textContent = timeLeft + " seconds remaining."
    timeLeft -= 1
    if (timeLeft < 0) {
      countdownEl.textContent = "Time is up!"
      clearInterval(timer)
      renderTimerDone()
    }
    console.log(timeLeft) //! delete this later
  }, 1000)
}

function resetTimer(){
  clearInterval(timer)
}

function randomLocation(){
  return Math.floor(Math.random() * 25)
}

function clearFoundFeathers() {
  cellEls.forEach(cell => cell.classList.remove('featherImg'))
}


let xPos
let yPos = 500

function animate() {
  xPos = 160
  yPos -= 3
  animateObj.style.transform = `translate(${xPos}px ,${yPos}px)`

  if (Math.abs(yPos) >= 600) {
    yPos = 500;
  }
  requestAnimationFrame(animate);
}


function clearAnimation() {
  // xPos = 160
  // yPos -= 3
  animateObj.sndToAS("pause")
  // if (Math.abs(yPos) >= 600) {
  //   yPos = 500;
  // }
}

/*-------------------------------- GOALS --------------------------------*/



/*-----------------------------------------------------------------------*/

//todo Images & copywrite the hints
//todo Copy of messages/hints

//todo Font
//todo Add animation
//todo README

//todo check indentation
//todo delete console.logs and unnecessary comments
//! Make sure image doesn't get distored
