const express=require("express");
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync (listingController.Index))
.post(
    isLoggedIn,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.createNewForm),
 );




 // New route
 router.get("/new",isLoggedIn, listingController.rendernewform);
 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editform));

// update route delete route  show route

router.route("/:id").put(isLoggedIn,
    isOwner,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.updatelisting))
  .get(wrapAsync (listingController.showlisting));

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroylisting));
 

module.exports=router;
