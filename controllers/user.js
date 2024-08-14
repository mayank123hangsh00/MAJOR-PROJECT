const User = require("../models/user.js");

module.exports.rendersignUpForm = (req,res) =>{
  res.render("users/signup.ejs")
};

module.exports.signUp = (async(req,res) =>{
  try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    req.flash("success", "welcome to Tavel quora");
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
      if(err){
        return next(err)
      }
      req.flash("success","welcome back to Travel Quora");
      res.redirect("/listings");
    });

  } catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

module.exports.renderLoginForm = (req,res) =>{
  res.render("users/login.ejs");
};

module.exports.Login = async(req,res) =>{
  req.flash("success","welcome back to Travel Quora");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
  };

  module.exports.Logout = (req,res,next) =>{
    req.logout((err) =>{
      if (err) {
        return next(err);
      }
      req.flash("success","you successfully logout")
      res.redirect("/listings");
    });
  };
  
