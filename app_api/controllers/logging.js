var db      = require('../models/db');
var env     = require('get-env');
var chalk   = require('chalk');
var util    = require('util');
var helpers = require('./helpers');

var debugLogin     = require('debug')('app-auth:login');
var debugJson      = require('debug')('app-auth:json');
var info           = require('debug')('info:app-auth');
var danger         = require('debug')('danger:app-auth');



module.exports.insertLogMessage = function (req, res) {

  var args = [];

  if (!req.body.user ) { helpers.sendJsonResponse(res, 400, {"message": "insertLogMessage(): user param not passed"}); return;};
  if (!req.body.logging_level ) { helpers.sendJsonResponse(res, 400, {"message": "insertLogMessage(): logging_level param not passed"}); return;};
  if (!req.body.title )     { helpers.sendJsonResponse(res, 400, {"message": "insertLogMessage(): title param not passed"}); return;};
  if (!req.body.json_text ) { helpers.sendJsonResponse(res, 400, {"message": "insertLogMessage(): json_text param not passed"}); return;};

  args.push(req.body.user);
  args.push(req.body.logging_level);
  args.push(req.body.title);
  args.push(req.body.json_text);

  db.pool.query("call insert_log_message(?,?,?,?)", args, function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['labs'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error inserting logging message",
                                       "Danger",
                                       err,
                                       data,
                                       res);
    } else {
      data['labs'] =  rows[0];
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};
