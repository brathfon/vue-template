/*
var db     = require('../models/db');

var chalk  = require('chalk');
var util   = require('util');
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

var debugLogin     = require('debug')('app-auth:login');
var debugPassword  = require('debug')('app-auth:json');
var info           = require('debug')('info:app-auth');
var danger         = require('debug')('danger:app-auth');
*/

var env       = require('get-env');
var debugJson = require('debug')('app-auth:json');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var errorObjToArray = function(obj) {
  var array = [];
  for (err in obj) {
    array.push(err + ": " + obj[err]);
  }
  return array;
}

var atob = function(text) {
  var buf = new Buffer(text, "base64");
  var bytes = [];
  for ( var i = buf.length; i >= 0; i-- ) {
    bytes[i] = String.fromCharCode(buf[i]);
  }

  return bytes.join("");
};


// Note: returnData should be passed with the return objects already set as either
// empty  arrays or null.,

var sendJsonErrorResponse = function(title, level, errorTextArray, status, returnData, res) {

    debugJson("Sending JSON of %o", errorTextArray);
    var errorMsg = {};

    // send this to the console, for sure, if dev or prod
    //console.log(chalk.red(title + ": " + util.inspect(errorTextArray, false, null)));
    // set up error to be returned for possible display
    errorMsg['title'] = title;
    errorMsg['level'] = level;
    errorMsg['text']  = [];
    if (env() === 'dev') {   // show the full error
      errorMsg['text'] = errorTextArray;
    }
    else {
      errorMsg['text'].push("Please report this error to " + process.env.WEB_MASTER_EMAIL);
    }
    returnData['errors'].push(errorMsg);

    //debugJson("in sendJsonErrorResponse just before send");
    sendJsonResponse(res, status, returnData);
};


var sendJsonSQLErrorResponse = function(title, level, sqlError, returnData, res) {

  var errorMsgArray = errorObjToArray(sqlError);
  // send SQL resonses back with the general status of 500 of a server error
  sendJsonErrorResponse(title, level, errorMsgArray, 500, returnData, res);

};


// this is for one line responses, though the text is an array that can have
// multiple entries.  Currently not used.

var sendJsonSimpleErrorResponse = function(title, level, text, returnData, res) {

    var errorMsgArray = [];
    errorMsgArray.push(text);
   // debugJson("sending response");
    sendJsonErrorResponse(title, level, errorMsgArray, returnData, 400, res);
};

module.exports.sendJsonSQLErrorResponse = sendJsonSQLErrorResponse;
module.exports.sendJsonResponse = sendJsonResponse;
module.exports.sendJsonErrorResponse = sendJsonErrorResponse;
