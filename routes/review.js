const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuther}=require("../middleware.js");

const reviewController=require("../controllers/review.js");



//Reviews
//POST reviews Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));

module.exports=router;
