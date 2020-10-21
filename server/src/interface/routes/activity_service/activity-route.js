const express = require("express");
const serviceCalls = require("../service-calls");
const ErrorHandler = require("../../../../error-handler");
const responseHelper = require("../../helpers/response-helper");
const enablePagination = require("../../middlewares/enable_pagination");
const { interfaceUtils } = require("../../../../utils");
const validator = require("../../middlewares/validator");
const {
  activityListing,
  activitySearch,
  latestActivities,
} = require("../../middlewares/schemas/activity_schema");

const router = express.Router();

router.post("/listing", validator(activityListing, "body"), enablePagination,
  async (req, res, next) => {
    let params = req.body;
    params.city = params.city.toUpperCase();
    // params.userId = req.user;
    serviceCalls
      .callActivityService("get_activity_listing", params)
      .then(async (data) => {
        data = interfaceUtils.addPaginationToRespons(
          data.Ok,
          "activities",
          req.body.pageNo
        );
        responseHelper.generateResponse(
          req,
          res,
          data,
          null,
          "Fetched Activity record Succcesfully",
          200
        );
      })
      .catch((err) =>
        next(
          new ErrorHandler({
            status: 503,
            message:
              "The service you are trying to reach is not available. Please try Again Later",
            detail: err,
          })
        )
      );
  }
);

router.post("/search", validator(activitySearch, "body", { todayDate: new Date().toDateString() }),
  enablePagination,
  async (req, res, next) => {
    let params = req.body;
    // params.userId = req.user;
    serviceCalls
      .callActivityService("search_activities", params)
      .then(async (data) => {
        data = interfaceUtils.addPaginationToRespons(
          data.Ok,
          "activities",
          req.body.pageNo
        );
        responseHelper.generateResponse(
          req,
          res,
          data,
          null,
          "Fetched Activity record Succcesfully",
          200
        );
      })
      .catch((err) =>
        next(
          new ErrorHandler({
            status: 503,
            message:
              "The service you are trying to reach is not available. Please try Again Later",
            detail: err,
          })
        )
      );
  }
);

router.get("/detail", async (req, res, next) => {
  let params = { activityId: req.query.activity_id };
  // params.userId = req.user;
  serviceCalls
    .callActivityService("get_detailed_activity", params)
    .then(async (data) => {
      responseHelper.generateResponse(
        req,
        res,
        data,
        null,
        "successfully fetched the interests of user",
        200
      );
    })
    .catch((err) =>
      next(
        new ErrorHandler({
          status: 503,
          message:
            "The service you are trying to reach is not available. Please try Again Later",
        })
      )
    );
});

router.post("/latest", validator(latestActivities, "body"),
  async (req, res, next) => {
    let params = req.body;
    // params.userId = req.user;
    serviceCalls
      .callActivityService("get_latest_activities", params)
      .then(async (data) => {
        responseHelper.generateResponse(
          req,
          res,
          data,
          null,
          "successfully fetched the interests of user",
          200
        );
      })
      .catch((err) =>
        next(
          new ErrorHandler({
            status: 503,
            message:
              "The service you are trying to reach is not available. Please try Again Later",
          })
        )
      );
  }
);

module.exports = router;
