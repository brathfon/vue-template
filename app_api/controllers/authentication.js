var db     = require('../models/db');
var env    = require('get-env');
var chalk  = require('chalk');
var util   = require('util');
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var helpers = require('./helpers');


var debugLogin     = require('debug')('app-auth:login');
var debugJson      = require('debug')('app-auth:json');
var debugPassword  = require('debug')('app-auth:json');
var info           = require('debug')('info:app-auth');
var danger         = require('debug')('danger:app-auth');


// *************************** hash functions **************************************

var createSaltAndHash = function(password) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
  return ({'salt' : salt, 'hash' : hash});
};


var recreateHash = function(salt, password) {
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
  return hash;
};



var createJWT = function(userInfo) {

  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign( {
    userID:  userInfo['userID'],
    firstName: userInfo['firstName'],
    lastName:  userInfo['lastName'],
    roles:     userInfo['roles'],
    exp:       parseInt(expiry.getTime() / 1000),
  },  process.env.JWT_SECRET);
};



var createUserInfoFromRows = function(rows) {

  var userInfo = {};
  userInfo['roles'] = [];
  for (i = 0; i < rows.length; ++i) {
    //debugLogin(chalk.blue("in api login: row : " + util.inspect(rows[i], false, null)));
    userInfo['userID']  = rows[i]['user_id'];
    userInfo['firstName'] = rows[i]['first_name'];
    userInfo['lastName']  = rows[i]['last_name'];
    userInfo['salt']      = rows[i]['salt'];
    userInfo['hash']      = rows[i]['hash'];
    userInfo['roles'].push(rows[i]['role_id']);
  }
  return userInfo;
};


// *************************** login  **************************************

module.exports.login = function (req, res) {

  debugLogin(chalk.green("err : " + util.inspect(req.body, false, null)));

  if (!req.body.email ) { helpers.sendJsonResponse(res, 400, {"message": "login(): email param not passed"}); return;};
  if (!req.body.password ) { helpers.sendJsonResponse(res, 400, {"message": "login(): password param not passed"}); return; };

  // we expect to return a token and no errors, but will return null for token if there are errors and
  // an empty list if there are not.
  var userEmail = req.body.email;
  var password    = req.body.password;
  var query = null;
  var data = {};
  data['token']           = null;
  data['loginSuccessful'] = false;
  data['errors'] = [];

  debugLogin("in api login");

  //debugLogin("query : " + query);
  query = 'call login(';
  query += db.pool.escape(userEmail) + ")";  // can't be blank
  db.pool.query(query, function(err, rows, fields) {

  //debugLogin(chalk.green("err : " + util.inspect(err, false, null)));
  //debugLogin(chalk.green("rows : " + util.inspect(rows, false, null)));
  //debugLogin(chalk.green("fields : " + util.inspect(fields, false, null)));

    var userInfo = null;
    var hashFromInput = null;

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for user " + userEmail + " role information",
                               "Danger",
                               err,
                               data,
                               res);
    } else {

      if (rows[0].length === 0) {
        danger("user input incorrect email for login of %s", userEmail);
        data['loginSuccessful'] = false;
        data['token'] = "NO_MATCHING_EMAIL_FOUND";
      }
      else {
        //data['roles'] =  rows;
        // there may be multiple rows for this user, so we are going to need to loop through and
        // get the roles.  All other data in each row will be duplicated
        userInfo = createUserInfoFromRows(rows[0]);

        //debugLogin(chalk.blue("in api login: " + util.inspect(userInfo, false, null)));
        hashFromInput = recreateHash(userInfo['salt'], password);
        //debugLogin(chalk.blue("hash from input: " + util.inspect(hashFromInput, false, null)));
        if (hashFromInput === userInfo['hash']) {
          info("user input correct password for login of %s", userEmail);
          data['loginSuccessful'] = true;
          data['token'] = createJWT(userInfo);
          //car parts = data['token'].split('.');
          //debugLogin("part 1 : " + atob(parts[1]));
        }
        else {
          danger("user input incorrect password for login of %s", userEmail);
          data['loginSuccessful'] = false;
          data['token'] = "PASSWORD_DOES_NOT_MATCH";
        }
      }
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};


module.exports.setPassword = function (req, res) {

  var userID    = null;
  var password    = null;
  var saltAndHash = null;

  if (!req.body.user_id ) { helpers.sendJsonResponse(res, 400, {"message": "login(): user_id param not passed"}); return;};
  if (!req.body.password )  { helpers.sendJsonResponse(res, 400, {"message": "login(): password param not passed"}); return; };

  debugPassword(chalk.blue("in api setPassord: req.body " + util.inspect(req.body, false, null)));
  debugPassword(chalk.blue("in api setPassord: req.payload " + util.inspect(req.payload, false, null)));

  userID = req.body.user_id;
  password = req.body.password;

  var saltAndHash = createSaltAndHash(password);

  var query = "call set_password (" + userID + ", '" + saltAndHash.salt + "', '" +  saltAndHash.hash + "')";

  //debugPassword(chalk.blue("query : " + util.inspect(query, false, null)));

  db.pool.query(query, function(err, rows, fields) {

  //debugPassword(chalk.green("err : " + util.inspect(err, false, null)));
  //debugPassword(chalk.green("rows : " + util.inspect(rows, false, null)));
  //debugPassword(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['token'] = null;
    data['errors'] = [];
    var userInfo = null;

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for user " + userID + " role information",
                                       "Danger",
                                       err,
                                       data,
                                       res);
      return;
    } else {

      if (rows[0].length === 0) {
        //data['token'] = "NO_MATCHING_EMAIL_FOUND";
        helpers.sendJsonSQLErrorResponse("Setting password for " + userID + " did not return any role information.",
                                         "Danger",
                                          err,
                                          data,
                                          res);
        return;
      }
      else {
        //data['roles'] =  rows;
        // there may be multiple rows for this user, so we are going to need to loop through and
        // get the roles.  All other data in each row will be duplicated
        // When returning rows from a stored procedure, the "rows" are a little different in organization
        // rows : [ [ RowDataPacket {
        //       user_id: 1,
        //       first_name: 'root',
        //       last_name: 'root',

        userInfo = createUserInfoFromRows(rows[0]);

        //debugPassword(chalk.blue("in api login: " + util.inspect(userInfo, false, null)));
        data['token'] = createJWT(userInfo);
        //car parts = data['token'].split('.');
        //debugPassword("part 1 : " + atob(parts[1]));
        helpers.sendJsonResponse(res, 201, data);
      }
    }
  });
};



module.exports.createNewUser = function (req, res) {

  var first_name;
  var last_name;
  var initials;
  var email;
  var phone_number;
  var password;
  var saltAndHash;
  var query;

  if (!req.body.first_name )  { helpers.sendJsonResponse(res, 400, {"message": "createNewUser(): first_name param not passed"}); return;};
  if (!req.body.last_name  )  { helpers.sendJsonResponse(res, 400, {"message": "createNewUser(): last_name param not passed"}); return;};
  if (!req.body.initials  )   { helpers.sendJsonResponse(res, 400, {"message": "createNewUser(): initials param not passed"}); return;};

  first_name   = req.body.first_name;
  last_name    = req.body.last_name;
  initials     = req.body.initials;
  email        = req.body.email;
  phone_number = req.body.phone_number;
  password     = req.body.password;

  query = 'call create_new_user(';
  query += db.pool.escape(first_name) + ", ";  // can't be blank
  query += db.pool.escape(last_name) + ", ";   // can't be blank
  query += db.pool.escape(initials) + ", ";    // can't be blank

  if (req.body.email === "") {   // optional
    query += "NULL, ";
  }
  else {
    query += db.pool.escape(email) + ", ";
  }
  if (req.body.phone_number === "") {   // optional
    query += "NULL, ";
  }
  else {
    query += db.pool.escape(phone_number) + ", ";
  }
  if (req.body.password === "") {   // optional
    query += "NULL, NULL)";
  }
  else {
    saltAndHash = createSaltAndHash(password);
    query += db.pool.escape(saltAndHash.salt) + ", ";
    query += db.pool.escape(saltAndHash.hash) + ")";
  }

  debugLogin("query: ", query);

  db.pool.query(query, function(err, rows, fields) {

    debugPassword(chalk.green("err : " + util.inspect(err, false, null)));
    debugPassword(chalk.green("rows : " + util.inspect(rows, false, null)));
    debugPassword(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    // calling a procedure returns a 2 element array with first element being the rows
    // and the second element being the meta data such as "fieldCount".  To get
    // the new_user_id, get the first element of the data array which is an
    // object with the attribute name of 'new_user_id'.
    data['errors'] = [];
    data['new_user_id'] = null;
    var userInfo = null;

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error creating new user " + first_name + " " + last_name,
                               "Danger",
                               err,
                               data,
                               res);
      return;
    } else {
      data['new_user_id'] = rows[0][0].new_user_id;
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};
