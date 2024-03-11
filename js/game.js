let gameItems = document.querySelectorAll(".gameItem")
const nameTxt = document.querySelector(".nameTxt")
const scoreTxt = document.querySelector(".scoreTxt")
const timerEl = document.querySelector(".timer")
const healsEl = document.querySelectorAll(".heart")
const summaryEl = document.querySelector(".winScreen")
const summaryTxt = summaryEl.querySelector("h1")
const summaryScoreTxt = summaryEl.querySelector("h2")
const starElems = summaryEl.querySelectorAll(".star")
const liElems = summaryEl.querySelectorAll("li")

let isWin
let timerIndex = 30;
let gameScore = 0
let powerScore = 3;
let soundPromise


//on click game item
const clickItem = async (event) => {
    //click on bom item
    if (parseInt(event.target.textContent) === 0) {
        soundPromise = audioClick('bom')
        if (--powerScore === 0) {
            exitGame(false)
        }
        drewHeals()
    }
    else {
        if (parseInt(event.target.textContent) < 0) {
            soundPromise = audioClick('reduce')
        }
        else {
            soundPromise = audioClick('add')
        }
    }
    //check if score is valid (not minus)
    if (gameScore + parseInt(event.target.textContent) < 0) {
        gameScore = 0
        exitGame(false)
    }
    else {
        gameScore += parseInt(event.target.textContent)
    }
    setStyle(event.currentTarget)
    scoreTxt.textContent = `score: ${gameScore}`
}
//set for a game item a randomly style
const setStyle = (item) => {
    const randNum = Math.floor(Math.random() * 12);
    item.style.backgroundImage = `url(${""}) `
    item.style.backgroundImage = `url(${gameItemsStyle[randNum].imgItem}) `
    if (gameItemsStyle[randNum].value != 0)
        item.innerHTML = `<h3>${gameItemsStyle[randNum].value}</h3>`
    else
        item.innerHTML = `<h2>${gameItemsStyle[randNum].value}</h2>`
}
//drew items and sets styles 
const drewItems = () => {
    gameItems.forEach(item => {
        setStyle(item)
        item.addEventListener("click", clickItem)
    });
}
//set the all game board
const changeLength = levels[currentLevel].change;
const setBord = () => {
    for (let i = 0; i < Math.floor(Math.random() * gameItems.length - changeLength) + changeLength; i++) {
        setStyle(gameItems[Math.floor(Math.random() * gameItems.length)]);
    }
}
const drewHeals = () => {
    healsEl[powerScore].src = "../images/HeartIconGrey.png";
}
//summery game when game finish
const summaryGame = async () => {

    summaryScoreTxt.textContent = gameScore;
    summaryTxt.textContent = (isWin) ? 'GREAT!!' : 'Try Again'
    summaryEl.style.display = 'flex'
    //turn off the stars
    if (!isWin) {
        starElems.forEach(star => {
            star.src = "../images/StarGrey.png";
        });
    }
    //create list of the best players
    const playersScore = players.map(player => {
        return player.score
    })
    const winningPlayers = []

    for (let i = 0; i < 4; i++) {
        const max = Math.max(...(playersScore));
        if (max === -1) {
            break;
        }
        const indexMax = playersScore.indexOf(max)
        const newPlayer = {
            'score': max,
            'index': indexMax
        }
        winningPlayers.push(newPlayer)
        //player should not apear again in the list
        playersScore[indexMax] = -1
    }

    let k = 0

    for (let i = 0; i < liElems.length; i++) {
        const txtScore = liElems[i].querySelector(".score_user h4")
        const txtName = liElems[i].querySelector(".name_user")
        txtScore.textContent = winningPlayers[i].score;
        txtName.textContent = players[winningPlayers[i].index].userName;
        //add style to current player
        if (winningPlayers[i].index === currntPlayerIndex) {
            txtName.parentElement.classList.add('current')
        }
    }
    if (isWin) {
        //if a sound is not endend, wait
        audioClick('win')
        //play confatii
        const duration = 15 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        run(animationEnd, defaults, duration)
    }
    else {
        //if a sound is not endend, wait
        if(soundPromise){
            await soundPromise
        }
        console.log(soundPromise);
        // audioClick('lose')
    }
}
//change the board every few random seconds
const speed = levels[currentLevel].speed

const intervalId = setInterval(() => {
    setBord()
}, speed)
const exitGame = (isWinner) => {
    if(isWinner){
        players[currntPlayerIndex].score += gameScore;
    }
    savePlayers()
    clearInterval(intervalTimer)
    isWin = isWinner
    summaryGame()
}
//timer
const intervalTimer = setInterval(() => {
    timer()
}, 1000)
const timer = () => {
    timerIndex--
    timerEl.textContent = `timer: ${timerIndex}`
    if (timerIndex === 0) {
        clearInterval(intervalTimer)
        timerIndex = 30
        if (gameScore >= 50) {
            exitGame(true)
        }
        else {
            exitGame(false)
        }
    }
}
//drew user's information on the document
const drew = () => {
    audioClick('win')
    document.body.style.background = levels[currentLevel].bColor
    document.body.style.backgroundSize = 'cover'
    powerScore = 3;
    scoreTxt.textContent = `score: ${gameScore}`
    nameTxt.textContent += players[currntPlayerIndex].userName + '\n' + 'Level ' + (currentLevel + 1)
    //remove style from all items
    for (let i = 0; i < gameItems.length - levels[currentLevel].size; i++) {
        gameItems[i].outerHTML = ""
    }
    gameItems = document.querySelectorAll(".gameItem")
    drewItems()
}
//confatti 
import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
const run = (animationEnd, defaults, duration) => {
    console.log("gggggg");
    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );
    }, 250);
};

drew()




























