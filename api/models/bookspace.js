const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    subdomain: {type: String, index: true, unique: true},
    lang: String,
    owner_id: mongoose.Schema.Types.ObjectId,
    is_active: {type: Boolean, default: true},
    invite_codes: [String],
    show_onboarding: Boolean,
});

schema.methods.checkAccess = function(actionName, user) {
    if (actionName === 'read') {
        return user.bookspace_id && user.bookspace_id === this._id ? Promise.resolve() : Promise.reject();
    }
    if (actionName === 'update') {
        return this.owner_id === user._id ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject();
};


schema.methods.getDataForAPI = function() {
    return {
        _id: this._id,
        name: this.name,
        subdomain: this.subdomain,
        show_onboarding: this.show_onboarding ? true : undefined,
    };
};

module.exports = mongoose.model("bookspaces", schema);