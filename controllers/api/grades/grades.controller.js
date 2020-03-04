const gradeRepo = require("../../../lib/gradesRepository"),
  util = require("util");

class GradeController {
  constructor(router) {
    router.get("/", this.getGrades.bind(this));
    router.get("/:gradeCode", this.getGradeByCode.bind(this));
    router.post("/", this.insertGradeMaster.bind(this));
    router.put("/:gradeCode", this.updateGradeMaster.bind(this));
    router.delete("/:gradeCode", this.deleteGrade.bind(this));
  }

  getGrades(req, res) {
    gradeRepo.getGrades((err, data) => {
      if (err) {
        console.log("*** getGrades error: " + util.inspect(err));
        res.json({
          sections: null
        });
      } else {
        console.log("*** getGrades ok");
        res.json(data.recordset);
      }
    });
  }

  getGradeByCode(req, res) {
    console.log("*** getGradeByCode");
    const gradeCode = req.params.gradeCode;

    gradeRepo.getGradeByCode(gradeCode, (err, grade) => {
      if (err) {
        console.log("*** getGradeByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getGradeByCode ok");
        if (grade && grade.length > 0) {
          res.json(grade[0]);
        }
      }
    });
  }

  insertGradeMaster(req, res) {
    console.log("*** insert Grade Master");
    gradeRepo.insertGradeMaster(req.body, (err, grade) => {
      if (err) {
        console.log(
          "*** GradeController.insertGradeMaster error: " + util.inspect(err)
        );
        res.json({ status: false, error: err, grade: null });
      } else {
        console.log("*** insert Grade Master ok");
        res.json({ status: true, error: null, grade: grade });
      }
    });
  }

  updateGradeMaster(req, res) {
    console.log("*** updateGradeMaster");

    if (!req.body) {
      throw new Error("Grade and associated properties are required");
    }

    gradeRepo.updateGradeMaster(
      req.params.gradeCode,
      req.body,
      (err, grade) => {
        if (err) {
          console.log("*** updateGradeMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", grade: null });
        } else {
          console.log("*** updateGradeMaster ok");
          res.json({ status: true, error: null, grade: grade });
        }
      }
    );
  }

  deleteGrade(req, res) {
    console.log("*** deleteGrade");

    gradeRepo.deleteGrade(req.params.gradeCode, err => {
      if (err) {
        console.log("*** deleteGrade error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteGrade ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = GradeController;
