const sectionRepo = require("../../../lib/sectionsRepository"),
  util = require("util");

class SectionController {
  constructor(router) {
    router.get("/", this.getSections.bind(this));
    router.get("/:divisionCode", this.getSectionByCode.bind(this));
    router.post("/", this.insertSectionMaster.bind(this));
    router.put("/:divisionCode", this.updateSectionMaster.bind(this));
    router.delete("/:divisionCode", this.deleteSection.bind(this));
  }

  getSections(req, res) {
    console.log("*** getSections");

    sectionRepo.getSections((err, data) => {
      if (err) {
        console.log("*** getSections error: " + util.inspect(err));
        res.json({
          sections: null
        });
      } else {
        console.log("*** getSections ok");
        res.json(data.recordset);
      }
    });
  }

  getSectionByCode(req, res) {
    console.log("*** getSectionByCode");
    const divisionCode = req.params.divisionCode;

    sectionRepo.getSectionByCode(divisionCode, (err, section) => {
      if (err) {
        console.log("*** getSectionByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getSectionByCode ok");
        if (section && section.length > 0) {
          res.json(section[0]);
        }
      }
    });
  }

  insertSectionMaster(req, res) {
    console.log("*** insert Section Master");
    sectionRepo.insertSectionMaster(req.body, (err, section) => {
      if (err) {
        console.log(
          "*** sectionController.insertSectionMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: err, section: null });
      } else {
        console.log("*** insert Section Master ok");
        res.json({ status: true, error: null, section: section });
      }
    });
  }

  updateSectionMaster(req, res) {
    console.log("*** updateSectionMaster");

    if (!req.body) {
      throw new Error("Section and associated properties are required");
    }

    sectionRepo.updateSectionMaster(
      req.params.divisionCode,
      req.body,
      (err, section) => {
        if (err) {
          console.log("*** updateSectionMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", section: null });
        } else {
          console.log("*** updateSectionMaster ok");
          res.json({ status: true, error: null, section: section });
        }
      }
    );
  }

  deleteSection(req, res) {
    console.log("*** deleteSection");

    sectionRepo.deleteSection(req.params.divisionCode, err => {
      if (err) {
        console.log("*** deleteSection error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteSection ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = SectionController;
