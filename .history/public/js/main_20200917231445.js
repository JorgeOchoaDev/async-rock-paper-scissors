let database = firebase.database();
let gamesRef = database.ref(`/games/${gameKey}` || "/games")
let currentGame;
let selectedOption;

gamesRef.on("value", snapshot => {
    console.log(snapshot.val())
})


document.getElementById("new-game").addEventListener("click", ()=>{
    let gameKey = gamesRef.push({active: true}).key
    document.getElementById("game-key-val").innerHTML = `Tu id de juego es: ${gameKey}`
    currentGame = gameKey
})

document.querySelectorAll(".option-radio").forEach( radio => {
    console.log(radio)
    radio.addEventListener("click", event => {
        selectedOption = event.target.value
        console.log(selectedOption)
    })
})

document.getElementById("go-button").addEventListener("click", () => {
    gamesRef.child(currentGame).update({ player1hand: selectedOption})
})

