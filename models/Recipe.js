const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  serving: { type: String },
  instructions: [
    { title: { type: String, required: true }, description: String },
  ],
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  recipeIngredients: [String],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Recipe", RecipeSchema);
