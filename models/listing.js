const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  
  },
  price:Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",    // this ref User means to refered to the user model
  },
});

ListingSchema.post("findOneAndDelete", async (listing) =>{  // This mongoose middleware is used for when listing document is deleted then all reviws also deleted //
  if(listing){
      await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});


const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;

