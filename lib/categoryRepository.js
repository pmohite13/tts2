const sql = require("mssql");
var config = require("../config/config.development");
require("msnodesqlv8");

class CategoryRepository {
  getCategory(callback) {
    console.log("*** CategoryRepository.getSections");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblCatagory WHERE isDeleted IS NULL",
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

  getCategoryByCode(categoryCode, callback) {
    console.log("*** CategoryRepository.getCategoryByCode" + categoryCode);

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "SELECT * FROM tblCatagory WHERE cat = '" + categoryCode + "'",
        function(err, data) {
          console.log("entered into get category by code request pipeline");
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

  insertCategoryMaster(body, callback) {
    console.log("*** CategoryRepository.insertCategoryMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("CategoryCode", sql.VarChar(3), body.cat);
      request.input("CategoryName", sql.VarChar(35), body.catagoryName);

      request.execute(
        "spInsertCategoryMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside insertCategoryMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside insertCategoryMaster function",
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

  updateCategoryMaster(categoryCode, body, callback) {
    console.log("*** CategoryRepository.updateCategoryMaster");

    sql.close();
    sql.connect(config, err => {
      if (err) console.log(err);
      let request = new sql.Request();

      request.input("CategoryCode", sql.VarChar(3), body.cat);
      request.input("CategoryName", sql.VarChar(35), body.categoryName);

      request.execute(
        "spUpdateCategoryMaster",
        (err, recordset, returnValue) => {
          console.log(
            "entered execute method inside updateCategoryMaster function"
          );
          if (err) {
            console.log(
              "Something went wrong inside updateCategoryMaster function",
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

  deleteCategory(categoryCode, callback) {
    console.log("*** CategoryRepository.deleteCategory");

    sql.close();
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "UPDATE tblCatagory SET isDeleted = 1 WHERE isDeleted IS NULL AND CAT = '" +
          categoryCode +
          "'",
        function(err, recordset) {
          console.log("entered delete category request pipeline");
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

module.exports = new CategoryRepository();
