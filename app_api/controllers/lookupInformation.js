var db = require('../models/db');
var env = require('get-env');
var chalk = require('chalk');
var util = require('util');
var helpers = require('./helpers');



module.exports.getRoles = function (req, res) {

  db.pool.query("call get_roles()", function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['roles'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for roles",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      data['roles'] =  rows[0];
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};
