const companiesRepo = require("../../../lib/companiesRepository"),
  util = require("util");

class CompanyController {
  constructor(router) {
    router.get("/", this.getCompanies.bind(this));
    router.get("/:companyCode", this.getCompanyByCode.bind(this));
    router.post("/", this.insertCompanyMaster.bind(this));
    router.put("/:companyCode", this.updateCompanyMaster.bind(this));
    router.delete("/:companyCode", this.deleteCompany.bind(this));
  }

  getCompanies(req, res) {
    console.log("*** getCompanies");

    companiesRepo.getCompanies((err, data) => {
      if (err) {
        console.log("*** getCompanies error: " + util.inspect(err));
        res.json({
          companies: null
        });
      } else {
        console.log("*** getCompanies ok");
        // console.log("controller class data: ", data);
        console.log("controller class data: ", data.recordset);
        res.json(data.recordset);
      }
    });
  }

  getCompanyByCode(req, res) {
    console.log("*** getCompanyByCode");
    const companyCode = req.params.companyCode;

    companiesRepo.getCompanyByCode(companyCode, (err, company) => {
      if (err) {
        console.log("*** getCompanyByCode error: " + util.inspect(err));
        res.json(null);
      } else {
        console.log("*** getCompanyByCode ok");
        if (company && company.length > 0) {
          res.json(company[0]);
        }
      }
    });
  }

  insertCompanyMaster(req, res) {
    console.log("*** insert Company Master");
    companiesRepo.insertCompanyMaster(req.body, (err, company) => {
      if (err) {
        console.log(
          "*** companyController.insertCompanyMaster error: " +
            util.inspect(err)
        );
        res.json({ status: false, error: "Insert failed", company: null });
      } else {
        console.log("*** insert Company Master ok");
        res.json({ status: true, error: null, company: company });
      }
    });
  }

  updateCompanyMaster(req, res) {
    console.log("*** updateCompany");

    if (!req.body) {
      throw new Error("Company and associated properties are required");
    }

    companiesRepo.updateCompanyMaster(
      req.params.companyCode,
      req.body,
      (err, company) => {
        if (err) {
          console.log("*** updateCompanyMaster error: " + util.inspect(err));
          res.json({ status: false, error: "Update failed", company: null });
        } else {
          console.log("*** updateCompanyMaster ok");
          res.json({ status: true, error: null, company: company });
        }
      }
    );
  }

  deleteCompany(req, res) {
    console.log("*** deleteCompany");

    companiesRepo.deleteCompany(req.params.companyCode, err => {
      if (err) {
        console.log("*** deleteCompany error: " + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log("*** deleteCompany ok");
        res.json({ status: true });
      }
    });
  }
}

module.exports = CompanyController;
