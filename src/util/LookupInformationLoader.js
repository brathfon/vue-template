var errorMsgs = require('./errorMessages');

var getLabs = function() {
  var errorMsgText;
  var errorMsgObj;
  var i;
  var msg = {
    method: 'get',
    url: '/api/getRoles',
    data: {}
  }

  this.$http(msg)
    .then((response) => {
      //console.log("RESPONSE ", response.data.labs);
      this.$store.commit('lookupInfo/updateRoles', response.data.roles);
    })
    .catch((error) => {
      errorMsgs.handleHttpErrors.call(this, error);
    });
};




var loadLookupInformation = function() {
  console.log("Starting loading of lookup information");
  getLabs.call(this);
  console.log("Done loading of lookup information");
};

export {
  loadLookupInformation
}
