const User=require("../models/user.js");

module.exports.rendersignup=(req,res)=>{   
    res.render("user/signup.ejs");
};

module.exports.signup=async (req,res)=>{
    try{
       let {username,email,password}=req.body;
       const newUser=new User({email,username});
       const registerUser= await User.register(newUser,password);
       req.login(registerUser, (err)=> {
        if (err) { return next(err); }
        req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
};

module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login=async (req,res)=>{
    // res.send("success")
  req.flash("success","Welcome back to Wanderlust!");
  let redirectUrl=res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    // it takes a callback as parameter 
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};