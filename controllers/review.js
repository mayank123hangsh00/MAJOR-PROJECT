const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res) =>{   // we created post route directly because we have to see reviews with listing
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);  // this means show.ejs file ma review object ke array ma jo comment and rating ha vo body se extract krlega
  newReview.author = req.user._id;
  listing.reviews.push(newReview);//newReview naya variable ha for the new Reviews to store from submit at website ye store krege reviews array ma that is in listing.js file
  
  await newReview.save();
  await listing.save();
  req.flash("success", "New review created");
  res.redirect(`/listings/${listing._id}`);
  };
  

  module.exports.destroyRoute = async(req, res) =>{
    let { id, reviewId} =req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     await Review.findByIdAndDelete(reviewId);
     req.flash("success", "Review deleted");
     res.redirect(`/listings/${id}`);
  };
