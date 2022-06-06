const jwt = require("jsonwebtoken");
const register = require('../models/userSchema')

const userAccess = ['/get'] 

const verifytoken = async function checkUserOrAdmin(req, res, next) {
    try {
        const token = req.headers['auth-token'];
        const verifyUser = jwt.verify(token, "mynameisrajbirsinghkhokharmanjitsingh");
        const user = await register.findOne({ _id: verifyUser._id })
        if(user.role === "Admin"){
            next();
        }
    else{
      if (userAccess.indexOf(req.path) != -1) {
        // user
  
        next();
      } else {
        // blog and admin
        // checkUserOrAdmin(req, res, next);
        res.json({
            message:"Invalid Role Only Admin can Access This"
    })
      }
    }
    req.token = token;
    req.user = user;
  } catch (error) {
    res.status(400).send({message:"Invalid Token"})
  }
  
}
module.exports = verifytoken
// const verifytoken = async (req, res, next) => {
//   //  console.log(req.path)
//     if (userAccess.indexOf(req.path) != -1) {
//       // user

//       next();
//     } else {
//       // blog and admin
//       checkUserOrAdmin(req, res, next);
//     }
//   }


// const { verify } = require("jsonwebtoken");
// // const userModel = require("../models/user");
// // const blogModel = require("../models/blog");

// // require("dotenv").config();
// const userAccess = ["/add"];
// // const blogaccessuser = ["/updateblog", "/getbyidblog", "/deleteblog"];
// async function checkUserOrAdmin(req, res, next) {
//   try {
//     const token = req.header("Authorization");
//     const data = verify(token, "mynameisrajbirsinghkhokharmanjitsingh");

//     const result = await register.findById(data.id);
//     if (result != undefined) {
//       req.id = data.id;
//       if (result.isstatus == true) {
//         console.log(data.role === "admin")
//         if (data.role === "admin") {
//           next();
//         } 
//         // else {
//         //   if (req.url == "/new" || req.url == "/bloglist") {
//         //     next();
//         //   } else if (blogaccessuser.indexOf(req.path) !== -1) {
//         //     const checkblog = await blogModel.find({ createdby: req.id });

//         //     if (checkblog.length == 0) {
//         //       res.json({ message: "You have not rights change this blog" });
//         //     } else {
//         //       next();
//         //     }
//         //   } else {
//         //     res.json({ message: "you have provide access for this api" });
//         //   }
//         // }
//       } else {
//         res.json({ message: "Yor not active member" });
//       }
//     } else {
//       res.json({ message: " your not a exist" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }





// module.exports = auth;