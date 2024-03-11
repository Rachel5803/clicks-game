const switcherEl = document.querySelector(".switch_box")
const loginFormEl = document.querySelector(".loginForm")
const signFormEl = document.querySelector(".signForm")
const btnSignEl = document.querySelector(".btnSign")

signFormEl.style.display = "none";
switcherEl.checked=false

// switcher login | signup
switcherEl.addEventListener("click", (e) => {
    audioClick('click')
    if (switcherEl.checked) {
        console.log("check");
        loginFormEl.style.display = "none";
        signFormEl.style.display = "block";
    }
    else {
        console.log("not_check");
        signFormEl.style.display = "none";
        loginFormEl.style.display = "block";
    }
})
//sign up form 
const signUp = (event) => {
    event.preventDefault()
    
    let error = false
    const userNameEl = signFormEl.querySelector(".userName")
    const passwordEl = signFormEl.querySelector(".password")
    const passwordConfirmEl = signFormEl.querySelector(".passwordConfirm")
    const formTxt = signFormEl.querySelector("h2")
    //Checking if the user exists
    players.forEach(player => {
        if (player.userName === userNameEl.value) {
            error = true
            formTxt.textContent='username is not unique'
            formTxt.style.display = 'block'
        }
    })
    if(passwordConfirmEl.value!=passwordEl.value)
    {
        error = true
        formTxt.textContent='passwords doesnt match'
        formTxt.style.display = 'block'
    }
    if(passwordEl.value.length < 6)
    {
        console.log("kkkkkkkkkkkkk");
        error = true
        formTxt.innerHTML=`Password must include<br> at least 6 digits`
        formTxt.style.display = 'block'
    }
    // New user registration
    if (!error) {
        const player = new Player(userNameEl.value, passwordEl.value);
        addPlayer(player)
        formTxt.textContent='successfully registered, log in'
        formTxt.style.display = 'block'
        savePlayers()
        audioClick('add')
    }
    else{
        audioClick('reduce')
    }
    // Reset fields
    userNameEl.value = ""
    passwordEl.value = ""
    passwordConfirmEl.value = ""
    // audioClick()

}
//adding a user to user array
const addPlayer = (player) => {
    players.push(player)
}
//log in form
 const  logIn = async (event) => {
    event.preventDefault()
   
    const userNameEl = loginFormEl.querySelector(".userName")
    const passwordEl = loginFormEl.querySelector(".password")
    const formTxt = loginFormEl.querySelector("h2")
    
    const findUser = players.find(player => {
        return (userNameEl.value === player.userName)
    }) 
    // Password check for an existing user
    if (findUser) {
        if (findUser.password === passwordEl.value) {
            await audioClick('click')
            PlayerStart(findUser)
        }
        else{
            audioClick('reduce')
            formTxt.textContent='Invalid password'
            formTxt.style.display = 'block'
        }
    }
    else {
        audioClick('reduce')
        formTxt.textContent='Username does not exist'
        formTxt.style.display = 'block'
        
    }
    // Reset fields
    passwordEl.value = ""
    userNameEl.value = ""
}
//saves user index
const PlayerStart =  (player) => {
    currntPlayerIndex = player.id
    localStorage.setItem("index_player_Storage", JSON.stringify(currntPlayerIndex))

    window.location.href="menu.html";

}
signFormEl.addEventListener("submit", signUp)
loginFormEl.addEventListener("submit", logIn)
//key up chack password
// passwordEl.addEventListener("keyup",(e)=>{
//     console.log("kkk");
//     if(passwordEl.value.lenght<8){
//         error = true
//         formTxt.textContent='Password must include at least 8 digits'
//         formTxt.style.display = 'block'
//     }
//     else{
//         error = false
//         formTxt.style.display = 'none'
//     }
// } )
