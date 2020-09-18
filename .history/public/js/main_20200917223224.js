let database = firebase.database();
let testRef = database.ref("/test")
testRef.on("value", snapshot => {
    console.log(snapshot.val())
})

const updateTest = (text) => {
    testRef.update({text})
}

document.getElementById("test-button").addEventListener('click', ()=>{
    let newText = document.getElementById("text-to-change").value
    console.log(newText)
    updateTest(newText)
})