
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    console.log("Registering............");
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    console.log(req.body.email);
    const user = new User({
      email: req.body.email,
      password: hash,
      mobile: req.body.mobile,
      name: req.body.name,
      role: 'user'
    });
    //console.log(user);
    user.save().then(result => {
      res.status(201).json({
        messege: "User Created",
        result: result
      });
      //console.log(result.result);
    })
    .catch(err => {
        //console.log(err);
         res.status(500).json({
           error: err
         });
      });
  });
};

exports.login = async (req, res, next) => {
    console.log("logging............")
  let fatchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
     return res.status(401).json({
        message: "auth failed"
      });
    }
    fatchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    const token = jwt.sign({email: fatchedUser.email, userId: fatchedUser._id, mobile: fatchedUser.mobile, name: fatchedUser.name},
       'secert_this_should_be_longer',
       {expiresIn: '1h'}
      );
      console.log(fatchedUser.role);
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fatchedUser._id,
      role: fatchedUser.role
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "auth failed"
    });
  });
}
