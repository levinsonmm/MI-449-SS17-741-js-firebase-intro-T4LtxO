// TODO Sign into the database anonymously

var config = {
  apiKey: 'AIzaSyC5Xv1ZlJ1Gs1McIJO_7fQxHHVktLcVSkM',
  authDomain: 'first-ade7d.firebaseapp.com',
  databaseURL: 'https://first-ade7d.firebaseio.com',
  projectId: 'first-ade7d',
  storageBucket: 'first-ade7d.appspot.com',
  messagingSenderId: '76066012979'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  // create a new record in Firebase
  firebase.database().ref('woofs').push({
    created_at: woof.created_at,
    text: woof.text
  })
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // read new, changed, and deleted Firebase records
  firebase.database().ref('woofs').on('child_added', function (newWoofSnapshot) {
    addWoofRow(newWoofSnapshot.key, newWoofSnapshot.val())
  })
  firebase.database().ref('woofs').on('child_changed', function (updatedWoofSnapshot) {
    updateWoofRow(updatedWoofSnapshot.key, updatedWoofSnapshot.val())
  })
  firebase.database().ref('woofs').on('child_removed', function (deletedWoofSnapshot) {
    deleteWoofRow(deletedWoofSnapshot.key, deletedWoofSnapshot.val())
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // update the record in Firebase
  firebase.database().ref('woofs').child(woofKey).child('text').set(
    woofText
  )
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // delete the record from Firebase
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
