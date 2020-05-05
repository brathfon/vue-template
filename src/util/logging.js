/*
This utility is used to send logging messages.  Level is one of the the levels used by
bootswatch (a little "view" dependency, sort of). They are:
primary, secondary, success, info, warning, danger
*/



var createSimpleMsg = function(title, level) {
  var errorMsg = {};
  errorMsg['title'] = title;
  errorMsg['level'] = level;
  errorMsg['text'] = [];
  return errorMsg;
};

var sendLogMessage = function(error) {
  var fullName = "system";
  var jsonText = "none";

  if (this.$store.state.auth.isLoggedIn) {  // there is someone logged in
    if (this.$store.state.auth.firstName) {
      fullName = this.$store.state.auth.firstName;
    }
    if (this.$store.state.auth.lastName) {
      if (fullName === "system") {  // something wrong with first name
        fullName = this.$store.state.auth.lastName;
      }
      else {
        fullName += " " + this.$store.state.auth.lastName;
      }
    }
  }
  else {
    console.error("ERROR: can not log without a user logged in. Need JWT");
    return;
  }
  // need to turn the objects into JSON string for storage in the db.
  // The error.text is an array of strings, and can be empty
  jsonText = JSON.stringify(error.text);


  this.$store.state.auth.firstName + " " + this.$store.state.auth.lastName
  var msg = {
    method: 'post',
    url: '/api/insertLogMessage',
    data: {
      'user': fullName,
      'logging_level' : error.level,
      'title' : error.title,
      'json_text': jsonText // error.text converted to JSON
    }
  }
  //console.log("msg", msg);
  this.$http(msg)
    .then((response) => {})
    .catch((error) => {
      // not going to display this since it will in turn try to send it to logging again
      console.error("util/logging(): had a problem sending the logging message to the api");
      console.error("ERROR: ", error);
    });
};

/* create a message with just a title, no text, and sends it */
var sendSimpleLogMessage = function(title, level) {
  var successLogMsg = createSimpleMsg(title, level);
    sendLogMessage.call(this, successLogMsg);
}

export {
  createSimpleMsg,
  sendLogMessage,
  sendSimpleLogMessage
};
