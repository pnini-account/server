const express = require("express");

const warningController = require("../controllers/warningController");

const warningRouter = express.Router();

warningRouter.route("/")
    .get(warningController.getAllWarnings)
    .post(warningController.addNewWarning);

warningRouter.route("/:id")
    .get(warningController.getWarningByWarningID)//todo:להפריד בין כל האזהרות לאזהרות בתוקף
    .patch(warningController.updateWarning)//todo:הפרדת העדכונים 
    .delete(warningController.deleteWarning);

module.exports = warningRouter;


