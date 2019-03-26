const mongoose = require("mongoose");
const Bookspace = require("./bookspace");

const schema = new mongoose.Schema({
    email: {type: String, index: true},
    password: {type: String, select: false},
    bookspace_id: {type: mongoose.Schema.Types.ObjectId, index: true},
    name: {type: String, index: true},
    email_verification: {
        is_verified: {type: Boolean, default: false},
        code: String,
    },
    is_active: {type: Boolean, default: true},
    timezone: String,
});


schema.methods.getFirstName = function() {
    return this.name.substr(0, this.name.indexOf(' '));
};

schema.methods.getBookspace = function() {
    if (!this.bookspace_id) {
        return Promise.resolve();
    } else {
        return Bookspace.findOne({_id: this.bookspace_id});
    }
};

schema.methods.getDataForAPI = function() {
    return {
        _id: this._id,
        email: this.email,
        name: this.name,
        bookspace_id: this.bookspace_id,
    };
};

module.exports = mongoose.model("users", schema);