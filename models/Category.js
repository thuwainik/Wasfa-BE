const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  recipe: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("Category", CategorySchema);
