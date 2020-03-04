const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const StateSchema = new Schema({
  companyCode: { type: String, trim: true, required: true },
  companyname: { type: String, trim: true, required: true, trim: true },
  companyaddress: { type: String, trim: true, required: true, trim: true },
  shortname: { type: String, required: true, trim: true },
  pannum: { type: String, required: true, trim: true },
  tannumber: { type: String, required: true, trim: true },
  pfno: { type: String, required: true, trim: true },
  lcno: { type: String, required: true, trim: true },
  tdscircle: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Company", StateSchema);
