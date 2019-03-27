  var config = {
    apiKey: "AIzaSyDPLPlV5fEP49fbVPuoJdng261apkuxiqE",
    authDomain: "myportfolio-9d7c2.firebaseapp.com",
    databaseURL: "https://myportfolio-9d7c2.firebaseio.com",
    projectId: "myportfolio-9d7c2",
    storageBucket: "myportfolio-9d7c2.appspot.com",
    messagingSenderId: "182323904825"
  };
  firebase.initializeApp(config);

//Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);



//submit form
function submitForm(e){
  e.preventDefault();

  //get Values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');


  // save message
  saveMessage(name, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert after 3s
  setTimeout(function(){
     document.querySelector('.alert').style.display = 'none';
  }, 3000);
  //clear form
  document.getElementById('contactForm').reset();
}


//Function to get form values
function getInputVal(id) {
 return document.getElementById(id).value;
}

  function saveMessage(name, phone, email, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email:email,
      phone:phone,
      message:message
    });
  }
