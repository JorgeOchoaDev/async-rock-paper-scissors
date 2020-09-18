let database = firebase.database();
let testRef = database.ref("/test")
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