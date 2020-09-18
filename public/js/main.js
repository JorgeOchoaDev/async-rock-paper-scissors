let database = firebase.database();
let testRef = database.ref("/test")
testRef.on("value", snapshot => {
    console.log(snapshot.val())
})

const updateTest = () => {
    testRef.set({text:"hello"})
}