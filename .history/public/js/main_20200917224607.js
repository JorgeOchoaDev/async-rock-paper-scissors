let database = firebase.database();
let testRef = database.ref("/test")
let gamesRef = database.ref("/games")

testRef.on("value", snapshot => {
    console.log(snapshot.val())
})

const updateTest = (text) => {
    let entryKey = testRef.update({text}).key
    console.log("key", entryKey)
}

document.getElementById("test-button").addEventListener('click', ()=>{
    let newText = document.getElementById("text-to-change").value
    console.log(newText)
    updateTest(newText)
})

document.getElementById("new-game").addEventListener("click", ()=>{
    let gameKey = gamesRef.push({active: true}).key
    document.getElementById("game-key-val").innerHTML = `Tu id de juego es: ${gameKey}`
})