const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class DepartmentRepository {
  // get all the states
  getDepartments(callback) {
    console.log("*** DepartmentRepository.getDepartments");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        // "SELECT * FROM tblDepartment WHERE isDeleted IS NULL",
        "SELECT * FROM tblDepartment",
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

  // get a  department by department code
  getDepartmentByCode(departmentCode, callback) {
    console.log(
      "*** DepartmentRepository.getDepartmentByCode" + departmentCode
    );

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblDepartment WHERE DEPARTMENTCODE = '" +
          departmentCode +
          "'",
        function(err, data) {
          console.log("entered into get department by code request pipeline");
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

  insertDepartmentMaster(body, callback) {
    console.log("*** DepartmentRepository.insertDepartmentMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("DepartmentCode", sql.VarChar(3), body.departmentCode);
      request.input("DepartmentName", sql.VarChar(45), body.departmentName);
      request.input("Head", sql.VarChar(35), body.departmentHead);
      request.input("Email", sql.VarChar(35), body.emailId);

      request.execute(
        "spInsertDepartmentMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertDepartmentMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertDepartmentMaster function",
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

  updateDepartmentMaster(departmentCode, body, callback) {
    console.log("*** DepartmentRepository.updateDepartmentMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("DepartmentCode", sql.VarChar(3), body.departmentCode);
      request.input("DepartmentName", sql.VarChar(45), body.departmentName);
      request.input("Head", sql.VarChar(35), body.departmentHead);
      request.input("Email", sql.VarChar(35), body.emailId);

      request.execute(
        "spUpdateDepartmentMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateDepartmentMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateDepartmentMaster function",
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

  deleteCompany(departmentCode, callback) {
    console.log("*** DepartmentRepository.deleteCompany");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "UPDATE tblDepartment SET isDeleted = 1 WHERE isDeleted IS NULL AND DEPARTMENTCODE = '" +
          departmentCode +
          "'",
        function(err, recordset) {
          console.log("entered delete department request pipeline");
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

module.exports = new DepartmentRepository();
