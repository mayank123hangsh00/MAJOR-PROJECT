const express = require("express"); // restructure reviews (step 4)
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor,} = require("../middleware.js");

const reviewController = require("../controllers/review.js");
const review = require("../models/review.js");


//Reviews route
//(step2) create Reviews  (post)
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));


  //Delete review route      ///  (step 9)
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyRoute));
  

  module.exports = router;