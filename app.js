if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

//console.log(process.env.SECRET) // remove this after you've confirmed it is working


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js"); // we require routes of listing.js file
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

 




const dbUrl = process.env.ATLASDB_URL;       // For data to go to online database service MONGOAtlas

main()
.then(() =>{ 
  console.log("connected to db");
})
.catch(err  =>{
  console.log(err);

});

async function main() {
  await mongoose.connect(dbUrl);
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



//connect-mongo(For deployment)
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,    // means after 24 gnta ka bad session ko vaps se login krna pdega website pe
});

store.on("error", () =>{
  console.log("ERROR IN MONGO SESSION STORE",err);
});



//express-session  
const sessionOptions = { store, secret: process.env.SECRET, resave: false, saveUninitialized: true,  //store is upper connect mongo varaible
   cookie: {
     expires: Date.now() + 7 * 24 *60 *60 * 1000,
    maxAge: 7 * 24 *60 *60 * 1000,
    httpOnly: true,
   },
};

//app.get("/", (req,res) =>{
//  res.send("root connected");
//});



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) =>{       // res.locals store
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/demouser", async(req,res) =>{
  let fakeUser = new User({
    email: "abc@gmail.com",
    username: "delta-student",
  });
  let registerUser = await User.register(fakeUser,"helloworld")
  res.send(registerUser);
});




app.use("/listings", listingsRouter);  //  all listings routes from routes folder
app.use("/listings/:id/reviews", reviewsRouter);  // all reviews routes from route folder
app.use("/", userRouter);





//app.get("/testListing", async (req,res) =>{
//  let sampleListing = {
//    title: "demoo",
///    description: "demo description",
//    price: 1500,
  //  location: "pune",
  //  country: "India",
// };

//Listing.create(sampleListing)            
//    .then(createdListing => {
 //       console.log("Listing created:", createdListing);
 //   })
 //   .catch(error => {
 //       console.error("Error creating listing:", error);
  //  });





 // let sampleListing = new listing({
   // title: "My new villa",
  //  description: "By the beech",
  //  price: 1200,
  //  location:  "calangut,goa",
  //  country: "India"
 // });
 
// await sampleListing.save();
//  console.log("db was saved");
// res.send("successfull testing");
// });

app.all("*", (req,res,next) =>{
  next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) =>{
  let { statusCode=500, message="something went wrong"} = err;
  res.status(statusCode).render("error.ejs", { message });
 // res.status(statusCode).send(message);
});

app.listen(8080, () =>{
console.log("server is listening to port 8080");
});


