/*-------------------------------- Constants --------------------------------*/

// Some legends say it dies in a show of flames and combustion, others that it simply dies and decomposes before being born again.
enviroArrays = [
  {
    enviroName: "enviroIntro",
    image: "url('../images/Phoenix-Fabelwesen.jpeg')",
    message:
      '"The phoenix is an immortal bird associated with Greek mythology (with analogs in many cultures) that cyclically regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor."',
  },
  {
    enviroName: "enviro1",
    image: "url('../images/Volcano.png')",
    message: '"The Greeks rooted the tale of the phoenix in Western imagination more than 2,500 years ago, but its story began in ancient Egypt and Arabia."',
    secretLocation: randomLocation(),
    choiceMessage1: "The Hills",
    choiceMessage2: "Sea",
  },
  {
    enviroName: "enviro2",
    image: "url('../images/Hills.png')",
    message: '"Slavic lore hosts two mythical birds, the traditional firebird (star of Stravinsky’s ballet) and Finist the Bright Falcon, whose name is derived from the Greek phoenix."',
    secretLocation: randomLocation(),
    choiceMessage1: "Catacombs",
    choiceMessage2: "Forest",
  },
  {
    enviroName: "enviro3",
    image: "url('../images/Catacombs.png')",
    message: '"The Chinese phoenix Feng Huang (Ho-o in Japan) is a completely separate bird dating back at least 7,000 years. This celestial fowl became entwined with the Western phoenix."',
    secretLocation: randomLocation(),
  },
  {
    enviroName: "enviroStoryOver", //environment when story is over
    image: "url('../images/StoryOverPlaceholder.png')",
    message:
    "You made a FATAL choice, and with zero feathers collected for a resurrection, it is the end.",
  },
  {
    enviroName: "enviroConsolation", //environment when alive but < 3 feathers
    image: "url('../images/ConsolationPlaceholder.png')",
    message: `You don't have the 3 feathers required to move forward to find the phoenix, but at least you're still alive! Try again.`,
  },
  {
    enviroName: "enviroPhoenix", //environment to find phoenix
    image: "url('../images/Cave.png')",
    message: "find phoenix message",
    secretLocation: randomLocation(),
  },
  {
    enviroName: "enviroOutOfTime", // timer ran out
    image: "url('../images/StoryOverPlaceholder.png')",
    message: 'Story over!',
  },
]

/*-------------------------------- Variables --------------------------------*/

let featherTotal, enviro, timer, timeLeft, xPos
let enviroGrid = new Array(25, null)
let yPos = 0

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

const countdownEl = document.getElementById("timer-area")

const mainImg = document.querySelector(".locationCells")
const guide = document.getElementById('guide')

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
guide.addEventListener("click", openGuide)

startBtn.addEventListener("click", function(evt){
  wings.volume = .14
  wings.play()
  })

cellEls.forEach((cell) => {
  cell.addEventListener("click", function(evt){
    wings.volume = .14
    wings.play()
  })
})

/*-------------------------------- Functions --------------------------------*/

init()

function init() {

  resetTimer()
  clearHoverColor()
  clearFoundFeathers()
  animateObj.setAttribute('hidden', true)

  featherTotal = 0
  featherBox.textContent = featherTotal
  enviroGrid = new Array(25, null)

  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  mainImg.style.backgroundImage = enviroArrays[0].image
  messageEl.textContent = enviroArrays[0].message

  startBtn.removeAttribute("hidden")
  guide.removeAttribute('hidden')
  resetBtn.setAttribute("hidden", true)
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  findPhxBtn.setAttribute("hidden", true)
  featherHeader.setAttribute("hidden", true)
  featherBox.setAttribute("hidden", true)
  countdownEl.setAttribute("hidden", true)
  enviro = enviroArrays[1]
}

function handleClickStart(evt) {
  renderEnvironment()
  startTimer()
  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"
}

function renderEnvironment() {
  startBtn.setAttribute("hidden", true)
  guide.setAttribute("hidden", true)
  resetBtn.removeAttribute("hidden")
  choice1Btn.removeAttribute("hidden")
  choice2Btn.removeAttribute("hidden")
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  featherHeader.removeAttribute("hidden")
  featherBox.removeAttribute("hidden")
  countdownEl.removeAttribute("hidden")
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
  const cellIdx = parseInt(evt.target.id.replace("c", ""))

  if (enviroGrid[cellIdx] === "found") {
    let locationCell = cellEls[cellIdx]
    locationCell.classList.add('featherImg')
    clearHoverColor()

    if (enviro !== enviroArrays[6]){
      featherTotal += 1
    }
    featherBox.textContent = featherTotal
    enviroGrid = new Array(25, null) // this is so that feather count does not continue to increase by clicking the same cell
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
    messageEl.textContent = `Congratulations you have found the mythical phoenix!`
    clearFoundFeathers()
    animateObj.removeAttribute('hidden')
    animate()
  }
}

function handleClickChoice(evt) {
  clearFoundFeathers()
  enviroGrid = new Array(25, null)
  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"

  if (evt.target.id === "choice1-btn") {
    enviro = enviroArrays[2]
    renderEnvironment()
    choice1Btn.setAttribute("hidden", true)
    choice2Btn.setAttribute("hidden", true)
    choice1BtnAlt.removeAttribute("hidden")
    choice2BtnAlt.removeAttribute("hidden")
  } else if (evt.target.id === "choice2-btn") {
    if (featherTotal > 0) {
      window.open(href="../images/resurrection.png",'popUpWindow','height=280,width=250,left=600,top=200,resizable=no,scrollbars=no,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      featherTotal -= 1
      featherBox.textContent = featherTotal
      enviro = enviroArrays[2]
      renderEnvironment()
      enviro.secretLocation = randomLocation()
      choice1Btn.setAttribute("hidden", true)
      choice2Btn.setAttribute("hidden", true)
      choice1BtnAlt.removeAttribute("hidden")
      choice2BtnAlt.removeAttribute("hidden")
    } else {
      clearFoundFeathers()
      renderStoryOver()
      choice1Btn.setAttribute("hidden", true)
      choice2Btn.setAttribute("hidden", true)
      choice1BtnAlt.setAttribute("hidden", true)
      choice2BtnAlt.setAttribute("hidden", true)
    }
  }
}

function handleClickChoiceAlt(evt) {
  clearFoundFeathers()
  enviroGrid = new Array(25, null)
  enviroGrid[enviro.secretLocation] = "found"

  if (evt.target.id === "choice1-btn-alt") {
    enviro = enviroArrays[3]
    renderEnvironment()
    choice1Btn.setAttribute("hidden", true)
    choice2Btn.setAttribute("hidden", true)
    choice1BtnAlt.setAttribute("hidden", true)
    choice2BtnAlt.setAttribute("hidden", true)
  } else if (evt.target.id === "choice2-btn-alt") {
    if (featherTotal > 0) {
      window.open(href="../images/resurrection.png",'popUpWindow','height=280,width=250,left=600,top=200,resizable=no,scrollbars=no,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      featherTotal -= 1
      featherBox.textContent = featherTotal
      enviro = enviroArrays[3]
      renderEnvironment()
      choice1Btn.setAttribute("hidden", true)
      choice2Btn.setAttribute("hidden", true)
      choice1BtnAlt.setAttribute("hidden", true)
      choice2BtnAlt.setAttribute("hidden", true)
    } else {
      clearFoundFeathers()
      renderStoryOver()
      choice1Btn.setAttribute("hidden", true)
      choice2Btn.setAttribute("hidden", true)
      choice1BtnAlt.setAttribute("hidden", true)
      choice2BtnAlt.setAttribute("hidden", true)
    }
  }
}

function renderStoryOver() {
  resetTimer()
  clearFoundFeathers()
  clearHoverColor()
  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  mainImg.style.backgroundImage = enviroArrays[4].image
  messageEl.textContent = enviroArrays[4].message
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  countdownEl.setAttribute("hidden", true)
  countdownEl.removeAttribute("hidden")
}

function renderTimerDone() {
  enviroGrid[enviro.secretLocation] = "found"
  resetTimer()
  clearFoundFeathers()
  headerPhx.classList.remove('animate__fadeIn')
  headerPhx.offsetWidth = headerPhx.offsetWidth
  headerPhx.classList.add('animate__fadeIn')

  mainImg.style.backgroundImage = enviroArrays[7].image //enviroOutOfTime
  messageEl.textContent = enviroArrays[7].message
  choice1Btn.setAttribute("hidden", true)
  choice2Btn.setAttribute("hidden", true)
  choice1BtnAlt.setAttribute("hidden", true)
  choice2BtnAlt.setAttribute("hidden", true)
  featherBox.setAttribute("hidden", true)
  featherHeader.setAttribute("hidden", true)
}

function renderConsolation() {
  enviroGrid[enviro.secretLocation] = "found"
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
  countdownEl.setAttribute("hidden", true)
}

function handleClickPhoenix() {
  clearFoundFeathers()
  enviro.secretLocation = randomLocation()
  enviroGrid[enviro.secretLocation] = "found"

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
  countdownEl.removeAttribute("hidden")
}

function startTimer(){
  timeLeft = 60

  timer = setInterval(function () {
    countdownEl.textContent = timeLeft + " seconds remaining"
    timeLeft -= 1
    if (timeLeft < 0) {
      countdownEl.textContent = "Time is up!"
      clearInterval(timer)
      renderTimerDone()
    }
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

function animate() {
  xPos = 180
  yPos -= 3
  animateObj.style.transform = `translate(${xPos}px ,${yPos}px)`

  if (Math.abs(yPos) >= 600) {
    yPos = 100;
  }
  requestAnimationFrame(animate);
}

function openGuide(){
  window.open(href="../images/guide.png",'popUpWindow','height=1000,width=800,left=700,top=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no, status=no')
}
