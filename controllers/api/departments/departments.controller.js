const departmentRepo = require("../../../lib/departmentsRepository"),
  util = require("util");

class DepartmentController {
  constructor(router) {
    router.get("/", this.getDepartments.bind(this));
    router.get("/:departmentCode", this.getDepartmentByCode.bind(this));
    router.post("/", this.insertDepartmentMaster.bind(this));
    router.put("/:departmentCode", this.updateDepartmentMaster.bind(this));
    router.delete("/:departmentCode", this.deleteDepartment.bind(this));
  }

  getDepartments(req, res) {
    console.log("*** getDepartments");

    departmentRepo.getDepartments((err, data) => {
      if (err) {
        console.log("*** getDepartments error: " + util.inspect(err));
        res.json({
          companies: null
        });
      } else {
        console.log("*** getDepartments ok");
        res.json(data.recordset);
      }
    });
  }

  getDepartmentByCode(req, res) {
    console.log("*** getDepartmentByCode");
    const departmentCode = req.params.departmentCode;

    departmentRepo.getDepartmentByCode(departmentCode, (err, department) => {
      if (err) {
        console.log("*** getDepartmentByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getDepartmentByCode ok");
        if (department && department.length > 0) {
          res.json(department[0]);
        }
      }
    });
  }

  insertDepartmentMaster(req, res) {
    console.log("*** insert Department Master");
    departmentRepo.insertDepartmentMaster(req.body, (err, department) => {
      if (err) {
        console.log(
          "*** departmentController.insertDepartmentMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: err, department: null });
      } else {
        console.log("*** insert Department Master ok");
        res.json({ status: true, error: null, department: department });
      }
    });
  }

  updateDepartmentMaster(req, res) {
    console.log("*** updateDepartment");

    if (!req.body) {
      throw new Error("Department and associated properties are required");
    }

    departmentRepo.updateDepartmentMaster(
      req.params.departmentCode,
      req.body,
      (err, department) => {
        if (err) {
          console.log("*** updateDepartmentMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", department: null });
        } else {
          console.log("*** updateDepartmentMaster ok");
          res.json({ status: true, error: null, department: department });
        }
      }
    );
  }

  deleteDepartment(req, res) {
    console.log("*** deleteDepartment");

    departmentRepo.deleteCompany(req.params.departmentCode, err => {
      if (err) {
        console.log("*** deleteDepartment error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteDepartment ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = DepartmentController;
