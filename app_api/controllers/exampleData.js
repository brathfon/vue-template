var db = require('../models/db');
var env = require('get-env');
var chalk = require('chalk');
var util = require('util');
var helpers = require('./helpers');


module.exports.getExampleData = function (req, res) {

  db.pool.query("call get_example_data()", function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['exampleData'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving example data from database",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      data['exampleData'] =  rows[0];
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};
