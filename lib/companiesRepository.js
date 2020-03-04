const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class CompaniesRepository {
  // get all the states
  getCompanies(callback) {
    console.log("*** CompaniesRepository.getCompanies");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblCompany WHERE isDeleted IS NULL",
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

  // get a  company by company code
  getCompanyByCode(companyCode, callback) {
    console.log("*** CompaniesRepository.getCompanyByCode" + companyCode);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblCompany WHERE COMPANYCODE = '" + companyCode + "'",
        function(err, data) {
          console.log("entered into get company by code request pipeline");
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

  insertCompanyMaster(body, callback) {
    console.log("*** CompaniesRepository.insertCompanyMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("CompanyCode", sql.VarChar(3), body.companyCode);
      request.input("CompanyName", sql.VarChar(50), body.companyName);
      request.input("CompanyAddress", sql.VarChar(150), body.companyAddress);
      request.input("ShortName", sql.VarChar(10), body.shortName);
      request.input("PanNum", sql.VarChar(25), body.pannum);
      request.input("TanNumber", sql.VarChar(25), body.tanNumber);
      request.input("TdsCircle", sql.VarChar(25), body.tdscircle);
      request.input("LcNo", sql.VarChar(25), body.lcno);
      request.input("PfNo", sql.VarChar(12), body.pfno);

      request.execute(
        "spInsertCompanyMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertCompanyMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertCompanyMaster function",
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

  updateCompanyMaster(companyCode, body, callback) {
    console.log("*** CompaniesRepository.updateCompanyMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("CompanyCode", sql.VarChar(3), companyCode);
      request.input("CompanyName", sql.VarChar(50), body.companyName);
      request.input("CompanyAddress", sql.VarChar(150), body.companyAddress);
      request.input("ShortName", sql.VarChar(10), body.shortName);
      request.input("PanNum", sql.VarChar(25), body.pannum);
      request.input("TanNumber", sql.VarChar(25), body.tanNumber);
      request.input("TdsCircle", sql.VarChar(25), body.tdscircle);
      request.input("LcNo", sql.VarChar(25), body.lcno);
      request.input("PfNo", sql.VarChar(12), body.pfno);

      request.execute(
        "spUpdateCompanyMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateCompanyMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateCompanyMaster function",
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

  deleteCompany(companyCode, callback) {
    console.log("*** CompaniesRepository.deleteCompany");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      console.log(
        "Query update: UPDATE tblCompany SET isDeleted = 1 WHERE isDeleted IS NULL AND COMPANYCODE = '" +
          companyCode +
          "'"
      );
      // query to the database and get the records
      request.query(
        "UPDATE tblCompany SET isDeleted = 1 WHERE isDeleted IS NULL AND COMPANYCODE = '" +
          companyCode +
          "'",
        function(err, recordset) {
          console.log("entered delete company request pipeline");
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

module.exports = new CompaniesRepository();
