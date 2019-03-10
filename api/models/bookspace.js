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
    url: {type: String, index: true},
    name: String,
    lang: String,
    signup_policy: {
        policy_type: String,
        domain: String,
    },
    book_policy: {
        policy_type: String,
        rules: String,
    },
    is_active: {type: Boolean, default: true},
});


module.exports = mongoose.model("bookplaces", schema);