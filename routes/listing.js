const express = require("express"); // restructure listings(step 3)
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({  storage });  // multer hmara storge ko clodinary ki storage ma jaka store karayga






router.route("/")
.get(wrapAsync(listingController.index))  // index route
.post( isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing)); //Create route


 //New route
 router.get("/new", isLoggedIn,(listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing))  // show route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing)) //update route
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));  //Delete route


// Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;