const loadEntity = (EntityModel) => (req, res, next) => {

    EntityModel.findOne({_id: req.params.id})
        .then(entity => {
           req.entity = entity;
           next();
        })
        .catch(err => next(err));;
};

module.exports = loadEntity;