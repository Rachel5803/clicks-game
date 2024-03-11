const nameTxt = document.querySelector(".nameTxt")
const scoreTxt = document.querySelector(".scoreTxt")
const btnLevel = document.querySelectorAll(".btnLevel")
// const flipBoxs = document.querySelectorAll(".flip-box-front")

console.log(nameTxt);
console.log(scoreTxt);
const drew = () => {
// flipBoxs.forEach (async (element)  =>  {
//     console.log(element);
//     element.addEventListener('mouseover',()=>{
//        audioClick('flip')
//     })
// });

    scoreTxt.innerHTML = `score: ${players[currntPlayerIndex].score}<img src="../images/StarYellow.png" alt="">`
    nameTxt.innerHTML = `HELLO ${players[currntPlayerIndex].userName} :)`

    btnLevel.forEach(element => {
        element.addEventListener('click', (e) => {
            localStorage.setItem("current_Level_Storage", JSON.stringify(element.className.substring(0, 1)))
            window.location.href = "game.html";
        })
    });

}

drew()














