class Player {
    constructor(name, pass) {
        this.userName = name
        this.password = pass
        this.score = 0
        this.id = players.length
    }
    // Score update function
    setScore(value) {
        if (this.score += value < 0) {
            console.log(exit);
        }
        else this.score += value
    }
}
class gameItemStyle {
    constructor(imgItem, value) {
        this.value = value
        this.imgItem = imgItem
    }
}
class Level {
    constructor(speed, size, change, bColor) {
        this.speed = speed
        this.size = size
        this.change = change
        this.bColor = bColor
    }
}
// clear localStorage
// localStorage.removeItem("players_Storage")
// localStorage.removeItem("current_player_Storage")

//let currntPlayer = JSON.parse(localStorage.getItem("current_player_Storage")) || null
let currntPlayerIndex = JSON.parse(localStorage.getItem("index_player_Storage")) || 0
let currentLevel = JSON.parse(localStorage.getItem("current_Level_Storage")) - 1 || 0

const players = JSON.parse(localStorage.getItem("players_Storage")) || []

audioManager = document.createElement("audio");


//array of types of items
const gameItemsStyle = []
const item1 = new gameItemStyle("../images/items/b1.png", -5);
gameItemsStyle.push(item1)
const item2 = new gameItemStyle("../images/items/b2.png", -20);
gameItemsStyle.push(item2)
const item3 = new gameItemStyle("../images/items/b3.png", -10);
gameItemsStyle.push(item3)
const item4 = new gameItemStyle("../images/items/b4.png", -3);
gameItemsStyle.push(item4)
const item5 = new gameItemStyle("../images/items/b5.png", -50);
gameItemsStyle.push(item5)
const item6 = new gameItemStyle("../images/items/b6.png", 20);
gameItemsStyle.push(item6)
const item7 = new gameItemStyle("../images/items/b7.png", 10);
gameItemsStyle.push(item7)
const item8 = new gameItemStyle("../images/items/b8.png", 5);
gameItemsStyle.push(item8)
const item9 = new gameItemStyle("../images/items/b9.png", 2);
gameItemsStyle.push(item9)
const item10 = new gameItemStyle("../images/items/b10.png", 15);
gameItemsStyle.push(item10)
const item11 = new gameItemStyle("../images/items/b11.png", 8);
gameItemsStyle.push(item11)
const item12 = new gameItemStyle("../images/items/Bomb.png", 0);
gameItemsStyle.push(item12)
const item13 = new gameItemStyle("../images/items/Bomb.png", 0);
gameItemsStyle.push(item13)
const item14 = new gameItemStyle("../images/items/Bomb.png", 0);
gameItemsStyle.push(item14)
const item15 = new gameItemStyle("../images/items/Bomb.png", 0);
gameItemsStyle.push(item15)
const item16 = new gameItemStyle("../images/items/Bomb.png", 0);
gameItemsStyle.push(item16)
//define levels
const levels = []

const level1 = new Level(300, 15, 3, 'linear-gradient(0deg, rgba(222, 3, 106, 0.526), rgba(222, 16, 54, 0.841)), url("../images/backgroundGame_Page_2.jpg")')
levels.push(level1)
const level2 = new Level(160, 21, 10, ' linear-gradient(0deg, rgba(55, 221, 36, 0.24), rgba(72, 255, 0, 0.746)), url("../images/backgroundGame_Page_2.jpg")')
levels.push(level2)
const level3 = new Level(90, 21, 15, 'linear-gradient(0deg, rgba(89, 2, 85, 0.582), rgba(25, 0, 21, 0.833)), url("../images/backgroundGame_Page_2.jpg")')
levels.push(level3)
//save the array of users
const savePlayers = () => {
    localStorage.setItem("players_Storage", JSON.stringify(players))
}

const audioClick = (status) => {
    audioUrl ={click:"../audio/CandyMatch.wav",win:"../audio/Win.wav",lose:"../audio/Lose.wav",bom:"../audio/Honey.wav",add:"../audio/Button.wav",reduce:"../audio/Error.wav",flip:"../audio/PopupClose.wav"}
    return new Promise(res => {
        audioManager.src = audioUrl[status]
        audioManager.play()
        audioManager.onended = res
    })
}


