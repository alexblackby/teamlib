const mongoose = require('mongoose');
const errorFactory = require('http-errors');
const {Category} = require('../../models/category');

exports.list = function (req, res, next) {
    Category.find((err, data) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, data: data });
        }
    });
};

exports.show = function (req, res, next) {
    let objectId;
    try {
        objectId = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
        return next();
    }
    Category.findById(objectId, (err, data) => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            if(data) {
                return res.json({success: true, data: data});
            } else {
                next();
            }
        }
    });
};

exports.post = function (req, res, next) {
    const {name, parent} = req.body;
    if (!name || (parent && !mongoose.Types.ObjectId.isValid(parent))) {
        return res.json({
            success: false,
            error: "Invalid input"
        });
    }
    let newCat = new Category();
    newCat.name = name;
    if(parent) newCat.parent = parent;
    newCat.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

exports.put = function (req, res, next) {
    const {name} = req.body;
    Category.findByIdAndUpdate(req.params.id, {name}, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

exports.delete = function (req, res, next) {
    Category.findByIdAndDelete(req.params.id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};