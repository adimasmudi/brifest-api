const app = require("express").Router();

const InvestorController = require("../controllers/InvestorController");

app.get("/", (req, res) => InvestorController.hello);
