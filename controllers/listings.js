const Listing=require("../models/listing");

module.exports.Index=async (req,res)=>{
    let allistings=await Listing.find({});
    res.render("listings/index",{allistings});
 };

 module.exports.rendernewform=(req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
 };

 module.exports.createNewForm = async (req, res, next) => {
   // console.log(req.body);

   let url=req.file.path;
   let filename=req.file.filename;

//   console.log(url, " .. ",filename);

     const sampleListing = new Listing(req.body.listing);
     sampleListing.owner = req.user._id;
     sampleListing.image = {url,filename};
     await sampleListing.save();
     req.flash("success", "New Listing Created");
     res.redirect("/listings");
 };

module.exports.editform=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","This listing now no longer exist!");
        res.redirect("/listings");
     }
     let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");

    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updatelisting=async (req,res)=>{

    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file!=="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename};
   await listing.save();
   }
    req.flash("success","Listing Updated!");
        res.redirect(`/listings/${id}`);
};

module.exports.destroylisting=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
  };


module.exports.showlisting=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
       path:'reviews',
    populate:{
       path:"author",
    },
   })
   .populate("owner");
   
    if(!listing){
       req.flash("error","This listing now no longer exist!");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing})
   };