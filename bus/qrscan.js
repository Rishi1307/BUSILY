function onScanSuccess(qrCodeMessage) {
    // Get a reference to the database service
    var database = firebase.database();
  
    // Generate a new push ID for the new post
    var postKey = firebase.database().ref('qr-codes/').push().key;
  
    // Create a new post with the QR code message and a timestamp
    var postData = {
      message: qrCodeMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
  
    // Write the new post's data simultaneously in the posts list and the user's post list
    var updates = {};
    updates['/qr-codes/' + postKey] = postData;
    updates['/user-posts/' + firebase.auth().currentUser.uid + '/' + postKey] = postData;
  
    // Update the database
    firebase.database().ref().update(updates);
  
    // Show an alert with the QR code message
    alert(qrCodeMessage);
  }