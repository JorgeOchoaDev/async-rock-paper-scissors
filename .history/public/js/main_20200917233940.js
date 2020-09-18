let database = firebase.database();
let gamesRef = database.ref("/games/")
let currentGame;
let selectedOption;
let player

/*gamesRef.on("value", snapshot => {
    console.log(snapshot.val())
})*/


document.getElementById("new-game").addEventListener("click", ()=>{
    player = 1
    let gameKey = gamesRef.push({player1Ready: true}).key
    document.getElementById("game-key-val").innerHTML = `Tu id de juego es: ${gameKey}`
    currentGame = gameKey
    let myGameRef = database.ref(`/games/${currentGame}`).on("value", snapshot => {
        console.log("game state", snapshot.val())
    })
})

document.querySelectorAll(".option-radio").forEach( radio => {
    console.log(radio)
    radio.addEventListener("click", event => {
        selectedOption = event.target.value
        console.log(selectedOption)
    })
})

document.getElementById("go-button").addEventListener("click", () => {
    if(player===1){
        gamesRef.child(currentGame).update({ player1Hand: selectedOption})
    }else{
        gamesRef.child(currentGame).update({ player2Hand: selectedOption})
    }
})

document.getElementById("join-game").addEventListener('click', () =>{
    player = 2
    let gameID = document.getElementById("game-id").value
    currentGame = gameID
    let joinedGameRef = database.ref(`/games/${gameID}`)
    joinedGameRef.update({player2Ready: true})
})