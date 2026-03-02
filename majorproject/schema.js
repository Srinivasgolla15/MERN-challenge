const joi = require("joi");



module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        // Remove image validation since it's handled by multer
        // latitude and longitude are optional (from map)
        latitude: joi.number().optional(),
        longitude: joi.number().optional()
    }).required(),
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required(),
})