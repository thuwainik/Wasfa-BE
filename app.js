const express = require("express");
const app = express();
const errorHandler = require("./middleware/erroHandler");
const notFoundHandler = require("./middleware/notFoundHandler");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./api/user/user.routes");
const categoryRouter = require("./api/category/category.routes");
const recipeRouter = require("./api/recipe/recipe.routes");
const IngredientRouter = require("./api/ingredient/ingredient.routes");

connectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.route("/api/user", userRouter);
app.route("/api/category", categoryRouter);
app.route("/api/recipe", recipeRouter);
app.route("/api/ingredient", IngredientRouter);

// Middleware
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is listening to Port " + process.env.PORT);
});
