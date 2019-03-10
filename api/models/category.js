const mongoose = require("mongoose");

const categorySchema = exports.categorySchema = new mongoose.Schema({
    name: String,
    parent: mongoose.Schema.Types.ObjectId,
});

exports.Category = mongoose.model("Category", categorySchema);