const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {type: String, index: true},
    password: {type: String, select: false},
    bookspace: {type: String, index: true},
    name: {type: String, index: true},
    email_verification: {
        is_verified: {type: Boolean, default: false},
        code: String,
    },
    is_active: {type: Boolean, default: true},
    timezone: String,
});

schema.methods.getDataForAPI = function() {
    return {
        _id: this._id,
        email: this.email,
        name: this.name,
    };
};

module.exports = mongoose.model("users", schema);