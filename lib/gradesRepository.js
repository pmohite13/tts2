const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class GradeRepository {
  getGrades(callback) {
    console.log("*** GradeRepository.getSections");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query("SELECT * FROM tblGrade WHERE isDeleted IS NULL", function(
        err,
        recordset
      ) {
        if (err) {
          console.log("Something went wrong", err);
          callback(err, null);
        } else {
          callback(null, recordset);
        }
      });
    });
  }

  getGradeByCode(gradeCode, callback) {
    console.log("*** GradeRepository.getGradeByCode" + gradeCode);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblGrade WHERE gradeCode = '" + gradeCode + "'",
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

  insertGradeMaster(body, callback) {
    console.log("*** GradeRepository.insertGradeMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("GradeCode", sql.VarChar(3), body.gradeCode);
      request.input("GradeName", sql.VarChar(45), body.gradeName);

      request.execute("spInsertGradeMaster", (err, recordset, returnValue) => {
        console.log("entered execute method inside insertGradeMaster function");
        if (err) {
          console.log(
            "Something went wrong inside insertGradeMaster function",
            err
          );
          callback(err, null);
        } else {
          callback(null, returnValue);
        }
      });
    });
  }

  updateGradeMaster(gradeCode, body, callback) {
    console.log("*** GradeRepository.updateGradeMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("GradeCode", sql.VarChar(3), body.gradeCode);
      request.input("GradeName", sql.VarChar(45), body.gradeName);

      request.execute("spUpdateGradeMaster", (err, recordset, returnValue) => {
        console.log("entered execute method inside updateGradeMaster function");
        if (err) {
          console.log(
            "Something went wrong inside updateGradeMaster function",
            err
          );
          callback(err, null);
        } else {
          callback(null, returnValue);
        }
      });
    });
  }

  deleteGrade(gradeCode, callback) {
    console.log("*** GradeRepository.deleteGrade");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "UPDATE tblGrade SET isDeleted = 1 WHERE isDeleted IS NULL AND gradeCode = '" +
          gradeCode +
          "'",
        function(err, recordset) {
          console.log("entered delete grade request pipeline");
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

module.exports = new GradeRepository();
