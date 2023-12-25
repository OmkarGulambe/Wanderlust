const User=require("../models/user");


module.exports.renderSignupForm=(req, res) => {
    res.render("./users/signup.ejs");
  }

  module.exports.signup=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      });
    } catch (er) {
      req.flash("error", er.message);
      res.redirect("/signup");
    }
  };


  module.exports.renderLoginForm=(req, res) => {
    res.render("./users/login.ejs");
  };

  module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    // console.log(res.locals.redirectUrl);
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };


  module.exports.logout= (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out now");
      res.redirect("/listings");
    });
  };