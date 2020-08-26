const employeeRepo = require("../../../lib/employeesRepository"),
  util = require("util");

class EmployeeController {
  constructor(router) {
    router.get("/", this.getEmployees.bind(this));
    router.get("/:employeeCode", this.getEmployeeByCode.bind(this));
    router.post("/", this.insertEmployeeMaster.bind(this));
    router.put("/:employeeCode", this.updateEmployeeMaster.bind(this));
    router.delete("/:employeeCode", this.deleteEmployee.bind(this));
  }

  getEmployees(req, res) {
    employeeRepo.getEmployees((err, data) => {
      if (err) {
        console.log("*** getEmployees error: " + util.inspect(err));
        res.json({
          employees: null,
        });
      } else {
        console.log("*** getEmployees ok");
        res.json(data.recordset);
      }
    });
  }

  getEmployeeByCode(req, res) {
    console.log("*** getEmployeeByCode");
    const employeeCode = req.params.employeeCode;

    employeeRepo.getEmployeeByCode(employeeCode, (err, shift) => {
      if (err) {
        console.log("*** getEmployeeByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getEmployeeByCode ok");
        if (shift && shift.length > 0) {
          res.json(shift[0]);
        }
      }
    });
  }

  insertEmployeeMaster(req, res) {
    console.log("*** insert Shift Master");
    employeeRepo.insertEmployeeMaster(req.body, (err, shift) => {
      if (err) {
        console.log(
          "*** EmployeeController.insertEmployeeMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: err, shift: null });
      } else {
        console.log("*** insert Shift Master ok");
        res.json({ status: true, error: null, shift: shift });
      }
    });
  }

  updateEmployeeMaster(req, res) {
    console.log("*** updateEmployeeMaster");

    if (!req.body) {
      throw new Error("Shift and associated properties are required");
    }

    employeeRepo.updateEmployeeMaster(
      req.params.employeeCode,
      req.body,
      (err, shift) => {
        if (err) {
          console.log("*** updateEmployeeMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", shift: null });
        } else {
          console.log("*** updateEmployeeMaster ok");
          res.json({ status: true, error: null, shift: shift });
        }
      }
    );
  }

  deleteEmployee(req, res) {
    console.log("*** deleteEmployee");

    employeeRepo.deleteEmployee(req.params.employeeCode, (err) => {
      if (err) {
        console.log("*** deleteEmployee error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteEmployee ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = EmployeeController;
