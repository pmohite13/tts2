const categoryRepo = require("../../../lib/categoryRepository"),
  util = require("util");

class CategoryController {
  constructor(router) {
    router.get("/", this.getCategory.bind(this));
    router.get("/:categoryCode", this.getCategoryByCode.bind(this));
    router.post("/", this.insertCategoryMaster.bind(this));
    router.put("/:categoryCode", this.updateCategoryMaster.bind(this));
    router.delete("/:categoryCode", this.deleteCategory.bind(this));
  }

  getCategory(req, res) {
    categoryRepo.getCategory((err, data) => {
      if (err) {
        console.log("*** getCategory error: " + util.inspect(err));
        res.json({
          category: null
        });
      } else {
        console.log("*** getCategory ok");
        res.json(data.recordset);
      }
    });
  }

  getCategoryByCode(req, res) {
    console.log("*** getCategoryByCode");
    const categoryCode = req.params.categoryCode;

    categoryRepo.getCategoryByCode(categoryCode, (err, grade) => {
      if (err) {
        console.log("*** getCategoryByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getCategoryByCode ok");
        if (grade && grade.length > 0) {
          res.json(grade[0]);
        }
      }
    });
  }

  insertCategoryMaster(req, res) {
    console.log("*** insert Category Master");
    categoryRepo.insertCategoryMaster(req.body, (err, category) => {
      if (err) {
        console.log(
          "*** CategoryController.insertCategoryMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: err, category: null });
      } else {
        console.log("*** insert Category Master ok");
        res.json({ status: true, error: null, category: category });
      }
    });
  }

  updateCategoryMaster(req, res) {
    console.log("*** updateCategoryMaster");

    if (!req.body) {
      throw new Error("Category and associated properties are required");
    }

    categoryRepo.updateCategoryMaster(
      req.params.categoryCode,
      req.body,
      (err, category) => {
        if (err) {
          console.log("*** updateCategoryMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", category: null });
        } else {
          console.log("*** updateCategoryMaster ok");
          res.json({ status: true, error: null, category: category });
        }
      }
    );
  }

  deleteCategory(req, res) {
    console.log("*** deleteCategory");

    categoryRepo.deleteCategory(req.params.categoryCode, err => {
      if (err) {
        console.log("*** deleteCategory error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteCategory ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = CategoryController;
