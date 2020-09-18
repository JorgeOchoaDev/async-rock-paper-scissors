let database = firebase.database();
let gamesRef = database.ref("/games")

gamesRef.on("value", snapshot => {
    console.log(snapshot.val())
})


document.getElementById("new-game").addEventListener("click", ()=>{
    let gameKey = gamesRef.push({active: true}).key
    document.getElementById("game-key-val").innerHTML = `Tu id de juego es: ${gameKey}`
})