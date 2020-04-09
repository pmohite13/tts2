const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class ShiftRepository {
  getShifts(callback) {
    console.log("*** ShiftRepository.getSections");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query("SELECT * FROM tblShiftMaster", function(err, recordset) {
        if (err) {
          console.log("Something went wrong", err);
          callback(err, null);
        } else {
          callback(null, recordset);
        }
      });
    });
  }

  getShiftByCode(shiftCode, callback) {
    console.log("*** ShiftRepository.getGradeByCode" + shiftCode);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblShiftMaster WHERE SHIFT = '" + shiftCode + "'",
        function(err, data) {
          console.log("entered into get shift by code request pipeline");
          if (err) {
            console.log("Something went wrong", err);
            callback(err, null);
          } else {
            callback(null, data.recordset);
          }
        }
      );
    });
  }

  insertShiftMaster(body, callback) {
    console.log("*** ShiftRepository.insertShiftMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("SHIFT", sql.VarChar(3), body.shift);
      request.input("STARTTIME", sql.DateTime, body.startTime);
      request.input("ENDTIME", sql.DateTime, body.endTime);
      request.input("LUNCHTIME", sql.DateTime, body.lunchTime);
      request.input("LUNCHDURATION", sql.Int, body.lunchDuration);
      request.input("LUNCHENDTIME", sql.DateTime, body.lunchEndTime);
      request.input("OTSTARTAFTER", sql.Float, body.otStartAfter);
      request.input("OTDEDUCTHRS", sql.Int, body.otDeductHrs);
      request.input("LUNCHDEDUCTION", sql.Int, body.lunchDeduction);
      request.input("SHIFTPOSITION", sql.VarChar(7), body.shiftPosition);
      request.input("SHIFTDURATION", sql.Float, body.shiftDuration);
      request.input("OTDEDUCTAFTER", sql.Float, body.otDeductAfter);
      request.input(
        "chkNightShiftAfter12",
        sql.VarChar(1),
        body.chkNightShiftAfter12
      );

      request.execute("spInsertShiftMaster", (err, recordset, returnValue) => {
        console.log("entered execute method inside insertShiftMaster function");
        if (err) {
          console.log(
            "Something went wrong inside insertShiftMaster function",
            err
          );
          callback(err, null);
        } else {
          callback(null, returnValue);
        }
      });
    });
  }

  updateShiftMaster(shiftCode, body, callback) {
    console.log("*** ShiftRepository.updateShiftMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("SHIFT", sql.VarChar(3), body.shift);
      request.input("STARTTIME", sql.DateTime, body.startTime);
      request.input("ENDTIME", sql.DateTime, body.endTime);
      request.input("LUNCHTIME", sql.DateTime, body.lunchTime);
      request.input("LUNCHDURATION", sql.Int, body.lunchDuration);
      request.input("LUNCHENDTIME", sql.DateTime, body.lunchEndTime);
      request.input("OTSTARTAFTER", sql.Float, body.otStartAfter);
      request.input("OTDEDUCTHRS", sql.Int, body.otDeductHrs);
      request.input("LUNCHDEDUCTION", sql.Int, body.lunchDeduction);
      request.input("SHIFTPOSITION", sql.VarChar(7), body.shiftPosition);
      request.input("SHIFTDURATION", sql.Float, body.shiftDuration);
      request.input("OTDEDUCTAFTER", sql.Float, body.otDeductAfter);
      request.input(
        "chkNightShiftAfter12",
        sql.VarChar(1),
        body.chkNightShiftAfter12
      );

      request.execute("spUpdateShiftMaster", (err, recordset, returnValue) => {
        console.log("entered execute method inside updateShiftMaster function");
        if (err) {
          console.log(
            "Something went wrong inside updateShiftMaster function",
            err
          );
          callback(err, null);
        } else {
          callback(null, returnValue);
        }
      });
    });
  }

  deleteShift(shiftCode, callback) {
    console.log("*** ShiftRepository.deleteShift");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "DELETE FROM tblShiftMaster WHERE [SHIFT] = '" + shiftCode + "'",
        function(err, recordset) {
          console.log("entered delete shift request pipeline");
          if (err) {
            console.log("Something went wrong", err);
            callback(err, null);
          } else {
            callback(null, recordset);
          }
        }
      );
    });
  }
}

module.exports = new ShiftRepository();
