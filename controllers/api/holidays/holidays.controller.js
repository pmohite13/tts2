const holidayRepo = require("../../../lib/holidaysRepository"),
  util = require("util");

class HolidayController {
  constructor(router) {
    router.get("/", this.getHolidays.bind(this));
    router.post("/", this.insertHolidayMaster.bind(this));
    router.delete(
      "/:hDate/:companyCode/:departmentCode",
      this.deleteHoliday.bind(this)
    );
  }

  getHolidays(req, res) {
    console.log("*** getHolidays");

    holidayRepo.getHolidays((err, data) => {
      if (err) {
        console.log("*** getHolidays error: " + util.inspect(err));
        res.json({
          holidays: null
        });
      } else {
        console.log("*** getHolidays ok");
        res.json(data.recordset);
      }
    });
  }

  insertHolidayMaster(req, res) {
    console.log("*** insert Holiday Master");
    holidayRepo.insertHolidayMaster(req.body, (err, holiday) => {
      if (err) {
        console.log(
          "*** HolidayController.insertHolidayMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: err, holiday: null });
      } else {
        console.log("*** insert Holiday Master ok");
        res.json({ status: true, error: null, holiday: holiday });
      }
    });
  }

  deleteHoliday(req, res) {
    console.log("*** deleteHoliday");

    holidayRepo.deleteHoliday(
      req.params.hDate,
      req.params.companyCode,
      req.params.departmentCode,
      err => {
        if (err) {
          console.log("*** deleteHoliday error: " + util.inspect(err));
          res.json({ status: false });
        } else {
          console.log("*** deleteHoliday ok");
          res.json({ status: true });
        }
      }
    );
  }
}

module.exports = HolidayController;
