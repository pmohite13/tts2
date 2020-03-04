const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class SectionRepository {
  getSections(callback) {
    console.log("*** SectionRepository.getSections");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblDivision WHERE isDeleted IS NULL",
        function(err, recordset) {
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

  getSectionByCode(divisionCode, callback) {
    console.log("*** SectionRepository.getSectionByCode" + divisionCode);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblDivision WHERE DivisionCode = '" + divisionCode + "'",
        function(err, data) {
          console.log("entered into get section by code request pipeline");
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

  insertSectionMaster(body, callback) {
    console.log("*** SectionRepository.insertSectionMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("DivisionCode", sql.VarChar(3), body.divisionCode);
      request.input("DivisionName", sql.VarChar(45), body.divisionName);

      request.execute(
        "spInsertDivisionMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertSectionMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertSectionMaster function",
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

  updateSectionMaster(divisionCode, body, callback) {
    console.log("*** SectionRepository.updateSectionMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("DivisionCode", sql.VarChar(3), body.divisionCode);
      request.input("DivisionName", sql.VarChar(45), body.divisionName);

      request.execute(
        "spUpdateDivisionMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateSectionMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateSectionMaster function",
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

  deleteSection(divisionCode, callback) {
    console.log("*** SectionRepository.deleteSection");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "UPDATE tblDivision SET isDeleted = 1 WHERE isDeleted IS NULL AND DivisionCode = '" +
          divisionCode +
          "'",
        function(err, recordset) {
          console.log("entered delete division request pipeline");
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

module.exports = new SectionRepository();
