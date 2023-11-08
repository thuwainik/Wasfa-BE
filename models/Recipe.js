const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  serving: { type: String },
  instructions: [
    {
      title: { type: String, required: true },
      description: String,
      order: Number,
    },
  ],
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
      measurement: String,
      qty: Number,
    },
  ],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Recipe", RecipeSchema);
