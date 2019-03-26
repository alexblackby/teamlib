const mongoose = require("mongoose");

/**
 * types of signup_policy
 * + by_domain
 * - by_whitelist
 * - by_secret_link
 *
 * types of book_policy
 * + many_to_many
 * - one_person (like "librarian")
 * - one_place (like "reception")
 */
const schema = new mongoose.Schema({
    name: String,
    subdomain: {type: String, index: true, unique: true},
    lang: String,
    owner_id: mongoose.Schema.Types.ObjectId,
    is_active: {type: Boolean, default: true},
    invite_codes: [String],
    show_onboarding: Boolean,
});


module.exports = mongoose.model("bookspaces", schema);