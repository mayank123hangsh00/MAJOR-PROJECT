
const Joi = require("joi");

module.exports.ListingSchema = Joi.object({     /// means in joi there is object and thats name is after curly brackets Listing 
  listing : Joi.object({  // means when we give request there should be always listing object there that was input name tag in new.js
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required(),
    country: Joi.string().required().min(0),
    image: Joi.string().allow("", null)
  }).required()
}); 

module.exports.reviewSchema = Joi.object({   // validation for schema(step 6)
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
})