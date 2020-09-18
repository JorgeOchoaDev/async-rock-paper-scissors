let database = firebase.database();
let gamesRef = database.ref("/games/")
let currentGame;
let selectedOption;
let player

/*gamesRef.on("value", snapshot => {
    console.log(snapshot.val())
})*/

const gameStateChecker = (gameState) => {
    console.log("cheking game state")
    let { player1Hand, player2Hand } = gameState
    let gameComplete = player1Hand && player2Hand ? true : false
    if( gameComplete && player1Hand === "rock" && player2Hand === "rock"){
        console.log("empate")
        document.querySelector("#result-modal .modal-title").innerHTML = "empate"
    } else if ( gameComplete && player1Hand === "rock" && player2Hand === "scissors" ){
        console.log("jugador 1 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 1 gana"
    } else if ( gameComplete && player1Hand === "rock" && player2Hand === "paper" ){
        console.log("jugador 2 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 2 gana"
    } else if ( gameComplete && player1Hand === "paper" && player2Hand === "paper" ){
        console.log("empate")
        document.querySelector("#result-modal .modal-title").innerHTML = "empate"
    } else if ( gameComplete && player1Hand === "paper" && player2Hand === "scissors" ){
        console.log("jugador 2 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 2 gana"
    } else if ( gameComplete && player1Hand === "paper" && player2Hand === "rock" ){
        console.log("jugador 1 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 1 gana"
    } else if ( gameComplete && player1Hand === "scissors" && player2Hand === "rock" ){
        console.log("jugador 2 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 2 gana"
    } else if ( gameComplete && player1Hand === "scissors" && player2Hand === "scissors" ){
        console.log("empate")
        document.querySelector("#result-modal .modal-title").innerHTML = "empate"
    } else if ( gameComplete && player1Hand === "scissors" && player2Hand === "paper" ){
        console.log("jugador 1 gana")
        document.querySelector("#result-modal .modal-title").innerHTML = "jugador 1 gana"
    }
    gameComplete && player1Hand && player2Hand ? $("#result-modal").modal("show") : null
    
}


document.getElementById("new-game").addEventListener("click", ()=>{
    player = 1
    let gameKey = gamesRef.push({player1Ready: true}).key
    document.getElementById("game-key-val").innerHTML = `Tu id de juego es: ${gameKey}`
    currentGame = gameKey
    database.ref(`/games/${currentGame}`).on("value", snapshot => {
        console.log("game state", snapshot.val())
        gameStateChecker(snapshot.val())
    })
})

document.getElementById("join-game").addEventListener('click', () =>{
    player = 2
    let gameID = document.getElementById("game-id").value
    let joinedGameRef = database.ref(`/games/${gameID}`)
    joinedGameRef.update({player2Ready: true})
    
    currentGame = gameID
    joinedGameRef.on("value", snapshot => {
        console.log("game state", snapshot.val())
        gameStateChecker(snapshot.val())
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
    $(".option-radio").not(":checked").closest(".option-item").addClass("d-none")
})

