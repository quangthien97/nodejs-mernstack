const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const moment = require("moment");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { NEWS } = require("../constant");
let timedate = moment().format();
const schema = new Schema({
  title: String,
  content: String,
  cateNews: { type: ObjectId, ref: "CateNews" },
  createdBy: { type: ObjectId, ref: "User" },
  countLike: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  avangeRating: {
    type: mongoose.Schema.Types.Double,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: NEWS.STATUS.NEW
  },
  count: Number,
  cateNews: {
    type: ObjectId,
    ref: "CateNews"
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  dateCreate: {
    type: String,
    default: moment(timedate)
      .add(7, "hour")
      .format("YYYY-MM-DD hh:mm:ss a")
  },
  tag: [{ type: ObjectId, ref: "Tag" }]
});

const NewsModel = mongoose.model("News", schema);

module.exports = NewsModel;
