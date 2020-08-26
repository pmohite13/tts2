const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class EmployeeRepository {
  getEmployees(callback) {
    console.log("*** EmployeeRepository.getEmployees");

    sql.close();
    // connect to your database
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query("SELECT * FROM TblEmployee", function (err, recordset) {
        if (err) {
          console.log("Something went wrong", err);
          callback(err, null);
        } else {
          callback(null, recordset);
        }
      });
    });
  }

  getEmployeeByCode(payCode, callback) {
    console.log("*** EmployeeRepository.getEmployeeByCode" + payCode);

    sql.close();
    // connect to your database
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      // request.query(
      //   "SELECT * FROM tblEmployeeShiftMaster WHERE PAYCODE = '" + payCode + "'",
      //   function (err, data) {
      //     console.log("entered into get employee by code request pipeline");
      //     if (err) {
      //       console.log("Something went wrong", err);
      //       callback(err, null);
      //     } else {
      //       callback(null, data.recordset);
      //     }
      //   }
      // );

      request.query("spgetEmployees", function (err, data) {
        console.log("entered into get employee by code request pipeline");
        if (err) {
          console.log("Something went wrong", err);
          callback(err, null);
        } else {
          callback(null, data.recordset);
        }
      });

      request.execute(
        "spinsertEmployeeMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertEmployeeMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertEmployeeMaster function",
              err
            );
            callback(err, null);
          } else {
            callback(null, returnValue);
          }
        }
      );
    });
  }

  insertEmployeeMaster(body, callback) {
    console.log("*** EmployeeRepository.insertEmployeeMaster");

    sql.close();
    sql.connect(config, (err) => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("PAYCODE", sql.VarChar(10), body.payCode);
      request.input("CARDNO", sql.VarChar(8), body.cardNo);
      request.input("SHIFT", sql.VarChar(3), body.shift);
      request.input("SHIFTTYPE", sql.VarChar(1), body.shiftType);
      request.input("SHIFTPATTERN", sql.VarChar(11), body.shiftPattern);
      request.input("SHIFTREMAINDAYS", sql.Int, body.shiftRemainDays);
      request.input(
        "LASTSHIFTPERFORMED",
        sql.VarChar(3),
        body.lastShiftPerformed
      );
      request.input("INONLY", sql.VarChar(1), body.isOnly);
      request.input("ISPUNCHALL", sql.VarChar(1), body.isPunchAll);
      request.input(
        "ISTIMELOSSALLOWED",
        sql.VarChar(1),
        body.isTimeLossAllowed
      );
      request.input(
        "ALTERNATE_OFF_DAYS",
        sql.VarChar(10),
        body.alternateOffDays
      );
      request.input("CDAYS", sql.Float, body.cDays);
      request.input(
        "ISROUNDTHECLOCKWORK",
        sql.VarChar(1),
        body.isRoundTheClockWork
      );
      request.input("ISOT", sql.VarChar(1), body.isOT);
      request.input("OTRATE", sql.VarChar(6), body.otRate);
      request.input("FIRSTOFFDAY", sql.VarChar(3), body.firstOffDay);
      request.input("SECONDOFFTYPE", sql.VarChar(1), body.secondOffType);
      request.input("HALFDAYSHIFT", sql.VarChar(3), body.halfDayShift);
      request.input("SECONDOFFDAY", sql.VarChar(3), body.secondOffDay);
      request.input("PERMISLATEARRIVAL", sql.Int, body.permisLateArrival);
      request.input("PERMISEARLYDEPRT", sql.Int, body.permisEarlyDeprt);
      request.input("ISAUTOSHIFT", sql.VarChar(1), body.isAutoShift);
      request.input("ISOUTWORK", sql.VarChar(1), body.isOutWork);
      request.input("MAXDAYMIN", sql.Float, body.maxDayMin);
      request.input("ISOS", sql.VarChar(1), body.isOS);
      request.input("AUTH_SHIFTS", sql.VarChar(50), body.authShifts);
      request.input("TIME", sql.Int, body.time);
      request.input("SHORT", sql.Int, body.short);
      request.input("HALF", sql.Int, body.half);
      request.input("ISHALFDAY", sql.VarChar(1), body.isHalfDay);
      request.input("ISSHORT", sql.VarChar(1), body.isShort);
      request.input("TWO", sql.VarChar(1), body.two);
      request.input("OW", sql.VarChar(1), body.ow);
      request.input("LateArrvMark", sql.VarChar(1), body.lateArrvMark);
      request.input("NolateArrv", sql.VarChar(2), body.noLateArrv);
      request.input("LateArriv", sql.VarChar(3), body.lateArriv);
      request.input("EarlyDeptMark", sql.VarChar(1), body.earlyDeptMark);
      request.input("NoEarlyDept", sql.VarChar(2), body.noEarlyDept);
      request.input("EarlyDept", sql.VarChar(3), body.earlyDept);
      request.input("AllwSecondShit", sql.VarChar(1), body.allwSecondShit);
      request.input("SecondShiftDay", sql.VarChar(3), body.secondShiftDay);
      request.input("SecondShift", sql.VarChar(3), body.secondShift);
      request.input(
        "AlternateShiftDays",
        sql.VarChar(10),
        body.alternateShiftDays
      );

      request.execute(
        "spinsertEmployeeMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertEmployeeMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertEmployeeMaster function",
              err
            );
            callback(err, null);
          } else {
            callback(null, returnValue);
          }
        }
      );
    });
  }

  updateEmployeeMaster(shiftCode, body, callback) {
    console.log("*** EmployeeRepository.updateEmployeeMaster");

    sql.close();
    sql.connect(config, (err) => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("PAYCODE", sql.VarChar(10), body.payCode);
      request.input("CARDNO", sql.VarChar(8), body.cardNo);
      request.input("SHIFT", sql.VarChar(3), body.shift);
      request.input("SHIFTTYPE", sql.VarChar(1), body.shiftType);
      request.input("SHIFTPATTERN", sql.VarChar(11), body.shiftPattern);
      request.input("SHIFTREMAINDAYS", sql.Int, body.shiftRemainDays);
      request.input(
        "LASTSHIFTPERFORMED",
        sql.VarChar(3),
        body.lastShiftPerformed
      );
      request.input("INONLY", sql.VarChar(1), body.isOnly);
      request.input("ISPUNCHALL", sql.VarChar(1), body.isPunchAll);
      request.input(
        "ISTIMELOSSALLOWED",
        sql.VarChar(1),
        body.isTimeLossAllowed
      );
      request.input(
        "ALTERNATE_OFF_DAYS",
        sql.VarChar(10),
        body.alternateOffDays
      );
      request.input("CDAYS", sql.Float, body.cDays);
      request.input(
        "ISROUNDTHECLOCKWORK",
        sql.VarChar(1),
        body.isRoundTheClockWork
      );
      request.input("ISOT", sql.VarChar(1), body.isOT);
      request.input("OTRATE", sql.VarChar(6), body.otRate);
      request.input("FIRSTOFFDAY", sql.VarChar(3), body.firstOffDay);
      request.input("SECONDOFFTYPE", sql.VarChar(1), body.secondOffType);
      request.input("HALFDAYSHIFT", sql.VarChar(3), body.halfDayShift);
      request.input("SECONDOFFDAY", sql.VarChar(3), body.secondOffDay);
      request.input("PERMISLATEARRIVAL", sql.Int, body.permisLateArrival);
      request.input("PERMISEARLYDEPRT", sql.Int, body.permisEarlyDeprt);
      request.input("ISAUTOSHIFT", sql.VarChar(1), body.isAutoShift);
      request.input("ISOUTWORK", sql.VarChar(1), body.isOutWork);
      request.input("MAXDAYMIN", sql.Float, body.maxDayMin);
      request.input("ISOS", sql.VarChar(1), body.isOS);
      request.input("AUTH_SHIFTS", sql.VarChar(50), body.authShifts);
      request.input("TIME", sql.Int, body.time);
      request.input("SHORT", sql.Int, body.short);
      request.input("HALF", sql.Int, body.half);
      request.input("ISHALFDAY", sql.VarChar(1), body.isHalfDay);
      request.input("ISSHORT", sql.VarChar(1), body.isShort);
      request.input("TWO", sql.VarChar(1), body.two);
      request.input("OW", sql.VarChar(1), body.ow);
      request.input("LateArrvMark", sql.VarChar(1), body.lateArrvMark);
      request.input("NolateArrv", sql.VarChar(2), body.noLateArrv);
      request.input("LateArriv", sql.VarChar(3), body.lateArriv);
      request.input("EarlyDeptMark", sql.VarChar(1), body.earlyDeptMark);
      request.input("NoEarlyDept", sql.VarChar(2), body.noEarlyDept);
      request.input("EarlyDept", sql.VarChar(3), body.earlyDept);
      request.input("AllwSecondShit", sql.VarChar(1), body.allwSecondShit);
      request.input("SecondShiftDay", sql.VarChar(3), body.secondShiftDay);
      request.input("SecondShift", sql.VarChar(3), body.secondShift);
      request.input(
        "AlternateShiftDays",
        sql.VarChar(10),
        body.alternateShiftDays
      );

      request.execute(
        "spUpdateEmployeeShiftMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateEmployeeMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateEmployeeMaster function",
              err
            );
            callback(err, null);
          } else {
            callback(null, returnValue);
          }
        }
      );
    });
  }

  deleteEmployee(payCode, callback) {
    console.log("*** EmployeeRepository.deleteEmployee");

    sql.close();
    // connect to your database
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "DELETE FROM tblEmployeeShiftMaster WHERE [PAYCODE] = '" +
          payCode +
          "'",
        function (err, recordset) {
          console.log("entered delete employee request pipeline");
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

module.exports = new EmployeeRepository();
