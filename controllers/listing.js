const Listing=require("../models/listing.js");
// const maptilersdk=require("../public/js/map.js")


module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm=(req, res) => {
    res.render("./listings/new");
  };

  module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "auther",
        },
      })
      .populate("owner");
    // console.log(listing);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    // console.log(listing);
    res.render("./listings/show.ejs", { listing });
  };

  module.exports.createListing=async (req, res, next) => {
    
  


    let url=req.file.path;
    let filename=req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
    console.log(req.file.path)
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };

  module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("./listings/edit.ejs", { listing ,originalImageUrl});
  };


  module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    // console.log({...req.body.listing});
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(req.file){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url, filename};
      await listing.save();
    }
   
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  };


  module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  };