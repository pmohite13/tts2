const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class HolidayRepository {
  getHolidays(callback) {
    console.log("*** getHolidays.getDepartments");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query("SELECT * FROM Holiday", function(err, recordset) {
        if (err) {
          console.log("Something went wrong", err);
          callback(err, null);
        } else {
          callback(null, recordset);
        }
      });
    });
  }

  getHolidayByKey(hDate, companyCode, departmentCode, callback) {
    console.log("*** HolidayRepository.getHolidayByKey" + hDate);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM Holiday WHERE HDate = '" +
          hDate +
          "' AND COMPANYCODE = '" +
          companyCode +
          "' AND DEPARTMENTCODE = '" +
          departmentCode +
          "'",
        function(err, data) {
          console.log("entered into get holiday by key request pipeline");
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

  insertHolidayMaster(body, callback) {
    console.log("*** HolidayRepository.insertHolidayMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();
      const table = new sql.Table("Holiday");
      table.create = true;
      table.columns.add("HDate", sql.DateTime, {
        nullable: false,
        primary: true
      });
      table.columns.add("Holiday", sql.VarChar(20), { nullable: true });
      table.columns.add("AdjustmentHoliday", sql.DateTime, {
        nullable: true
      });
      table.columns.add("OT_Factor", sql.Float, { nullable: true });
      table.columns.add("CompanyCode", sql.VarChar(3), {
        nullable: false
      });
      table.columns.add("DepartmentCode", sql.VarChar(3), {
        nullable: false,
        primary: true
      });

      // add here rows to insert into the table
      let holiday = body;
      for (let c = 0; c < holiday.companyCode.length; c++) {
        for (let d = 0; d < holiday.departmentCode.length; d++) {
          table.rows.add(
            new Date(holiday.hDate),
            holiday.holiday,
            new Date(holiday.adjustmentHoliday),
            null,
            holiday.companyCode[c]["COMPANYCODE"],
            holiday.departmentCode[d]["DEPARTMENTCODE"]
          );
        }
      }
      console.log("Returned table value: ", table);

      return request.bulk(table, (err, returnValue) => {
        console.log(
          "entered execute method inside insertHolidayMaster function"
        );
        if (err) {
          console.log(
            "Something went wrong inside insertHolidayMaster function",
            err
          );
          callback(err, null);
        } else {
          callback(null, returnValue);
        }
      });
    });
  }

  // insertHolidayMaster(body, callback) {
  //   console.log("*** HolidayRepository.insertHolidayMaster");

  //   sql.close();
  //   sql.connect(config, err => {
  //     if (err) console.log(err);
  //     let request = new sql.Request();

  //     request.input("HDate", sql.DateTime, body.hDate);
  //     request.input("Holiday", sql.VarChar(20), body.holiday);
  //     request.input("AdjustmentHoliday", sql.DateTime, body.adjustmentHoliday);
  //     request.input("OT_Factor", sql.Float, body.ot_factor);
  //     request.input("CompanyCode", sql.VarChar(3), body.companyCode);
  //     request.input("DepartmentCode", sql.VarChar(3), body.departmentCode);

  //     request.execute(
  //       "spInsertDepartmentMaster",
  //       (err, recordset, returnValue) => {
  //         console.log(
  //           "entered execute method inside insertHolidayMaster function"
  //         );
  //         if (err) {
  //           console.log(
  //             "Something went wrong inside insertHolidayMaster function",
  //             err
  //           );
  //           callback(err, null);
  //         } else {
  //           callback(null, returnValue);
  //         }
  //       }
  //     );
  //   });
  // }

  updateHolidayMaster(body, callback) {
    console.log("*** HolidayRepository.updateHolidayMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("HDate", sql.DateTime, body.hDate);
      request.input("Holiday", sql.VarChar(20), body.holiday);
      request.input("AdjustmentHoliday", sql.DateTime, body.adjustmentHoliday);
      request.input("OT_Factor", sql.Float, body.ot_factor);
      request.input("CompanyCode", sql.VarChar(3), body.companyCode);
      request.input("DepartmentCode", sql.VarChar(3), body.departmentCode);

      request.execute(
        "spUpdateHolidayMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateHolidayMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateHolidayMaster function",
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

  deleteHoliday(hDate, companyCode, departmentCode, callback) {
    console.log("*** HolidayRepository.deleteHoliday");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "DELETE FROM Holiday WHERE HDate = '" +
          hDate +
          "' AND COMPANYCODE = '" +
          companyCode +
          "' AND DEPARTMENTCODE = '" +
          departmentCode +
          "'",
        function(err, recordset) {
          console.log("entered delete holiday request pipeline");
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

module.exports = new HolidayRepository();
