const express = require("express");

const categoryController = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(categoryController.getAllCategorys)
    .post(categoryController.addNewCategory);

categoryRouter.route("/:id")
    .get(categoryController.getCategoryByUserID)
    .patch(categoryController.updateCategory)//todo:להפריד עדכון של שם, תמונה וצבע... 
    //todo:searchCategory function
    .delete(categoryController.deleteCategory);

module.exports = categoryRouter;