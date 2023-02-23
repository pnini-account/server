const express = require("express");

const folderController = require("../controllers/folderController");

const folderRouter = express.Router();

folderRouter.route("/")
    .get(folderController.getAllFolders)
    .post(folderController.addNewFolder);

folderRouter.route("/:id")
    .get(folderController.getInFolder)
    .patch(folderController.updateFolder)//todo:להפריד עדכון של שם ונתיב 
    //todo:searchFolder function
    .delete(folderController.deleteFolder);

module.exports = folderRouter;
