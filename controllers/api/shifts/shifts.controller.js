const shiftRepo = require("../../../lib/shiftsRepository"),
  util = require("util");

class ShiftController {
  constructor(router) {
    router.get("/", this.getShifts.bind(this));
    router.get("/:shiftCode", this.getShiftByCode.bind(this));
    router.post("/", this.insertShiftMaster.bind(this));
    router.put("/:shiftCode", this.updateShiftMaster.bind(this));
    router.delete("/:shiftCode", this.deleteShift.bind(this));
  }

  getShifts(req, res) {
    shiftRepo.getShifts((err, data) => {
      if (err) {
        console.log("*** getShifts error: " + util.inspect(err));
        res.json({
          sections: null
        });
      } else {
        console.log("*** getShifts ok");
        res.json(data.recordset);
      }
    });
  }

  getShiftByCode(req, res) {
    console.log("*** getShiftByCode");
    const shiftCode = req.params.shiftCode;

    shiftRepo.getShiftByCode(shiftCode, (err, shift) => {
      if (err) {
        console.log("*** getShiftByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getShiftByCode ok");
        if (shift && shift.length > 0) {
          res.json(shift[0]);
        }
      }
    });
  }

  insertShiftMaster(req, res) {
    console.log("*** insert Shift Master");
    shiftRepo.insertShiftMaster(req.body, (err, shift) => {
      if (err) {
        console.log(
          "*** ShiftController.insertShiftMaster error: " + util.inspect(err)
        );
        res.json({ status: false, error: err, shift: null });
      } else {
        console.log("*** insert Shift Master ok");
        res.json({ status: true, error: null, shift: shift });
      }
    });
  }

  updateShiftMaster(req, res) {
    console.log("*** updateShiftMaster");

    if (!req.body) {
      throw new Error("Shift and associated properties are required");
    }

    shiftRepo.updateShiftMaster(
      req.params.shiftCode,
      req.body,
      (err, shift) => {
        if (err) {
          console.log("*** updateShiftMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", shift: null });
        } else {
          console.log("*** updateShiftMaster ok");
          res.json({ status: true, error: null, shift: shift });
        }
      }
    );
  }

  deleteShift(req, res) {
    console.log("*** deleteShift");

    shiftRepo.deleteShift(req.params.shiftCode, err => {
      if (err) {
        console.log("*** deleteShift error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteShift ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = ShiftController;
