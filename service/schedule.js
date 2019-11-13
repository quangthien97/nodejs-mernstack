const cron = require("node-cron");
const ViewModel = require("../models/View");
const NewsModel = require("../models/News");
const StatisticModel = require("../models/Statistic");
const moment = require("moment");
const { NEWS } = require("../constant");
module.exports = {
  view: async (req, res) => {
    try {
      const allNews = await NewsModel.find({ isDelete: false });
      const mapNews = allNews.map(x => x._id);
      let timedate = moment().format();
      const today = new Date(
        moment(timedate)
          .add(7, "hour")
          .format("YYYY-MM-DD")
      );
      cron.schedule("* 59 11 * * *", function() {
        mapNews.forEach(async elment => {
          const countView = await ViewModel.find({
            isDelete: false,
            news: elment,
            date: {
              $gte: today,
              $lte: new Date(
                moment(today)
                  .endOf("day")
                  .toDate()
              )
            }
          });
          const statistic = new StatisticModel({
            view: countView.length,
            news: elment,
            date: today
          });
          const statisticClass = await statistic.save();
          console.log(statisticClass);
        });
      });
    } catch (err) {
      return res.json({
        data: null,
        code: 400,
        err: err.message
      });
    }
  },
  viewMonth: async (req, res) => {
    try {
      const allNews = await NewsModel.find({ isDelete: false });
      const mapNews = allNews.map(x => x._id);
      let timedate = moment().format();
      const today = new Date(
        moment(timedate)
          .add(7, "hour")
          .format("YYYY-MM-DD")
      );
      cron.schedule("* 59 11 * * *", function() {
        mapNews.forEach(async elment => {
          const countView = await ViewModel.find({
            isDelete: false,
            news: elment,
            date: {
              $gte: today,
              $lte: new Date(
                moment(today)
                  .endOf("day")
                  .toDate()
              )
            }
          });
          const statistic = new StatisticModel({
            view: countView.length,
            news: elment,
            date: today
          });
          const statisticClass = await statistic.save();
          console.log(statisticClass);
        });
      });
    } catch (err) {
      return res.json({
        data: null,
        code: 400,
        err: err.message
      });
    }
  }
};
