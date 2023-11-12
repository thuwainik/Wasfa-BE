const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

exports.getAllcategories = async (req, res, next) => {
  try {
    const categories = Category.find().populate();
    res.status(201).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create();
    await Recipe.findByIdAndUpdate(req.user._id, {
      $push: { recipe: newCategory._id },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
exports.updtCategory = async (req, res, next) => {
  try {
    const updtdCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body
    );
  } catch (error) {
    next(error);
  }
};
exports.delCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(204).json("Deleted");
  } catch (error) {
    next(error);
  }
};
