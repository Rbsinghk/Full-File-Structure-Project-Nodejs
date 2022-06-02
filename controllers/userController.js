const userSchema = require('../models/userSchema')
const imageSchema = require('../models/userProfileSchema')
const otpSchema = require('../models/otpSchema')
const multer = require('multer')
const path = require('path')
const nodemailer = require("nodemailer");

const userAdd = async (req, res) => {
    try {
        const register = new userSchema(req.body);
        const reg = await register.save();
        if (reg) {
            async function main() {
                let testAccount = await nodemailer.createTestAccount();
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });

                let info = await transporter.sendMail({
                    from: 'Fred Foo 👻" <foo@example.com>', // sender address
                    to: req.body.email,
                    // to: "rbsinghk30@gmail.com,mailto:sravankomati.vision@gmail.com,krushitsachapara.vision@gmail.com", // list of receivers
                    subject: "Hello Frnds ✔", // Subject line
                    html: ("Register SuccessFully"), // html body
                });
                // if (info.messageId) {
                //     res.send("email send")
                // } else {
                //     res.send("Email Not Send")
                // }

            }
            main().catch(console.error);
        }
        else {
            res.send("error")
        }
        res.status(201).send(`${reg} `)
    } catch (error) {
        res.status(400).send(error)
    }
}

const userGet = async (req, res) => {
    try {
        const get = await userSchema.find({})
        res.send(get)
    } catch (error) {
        res.send(error)
    }
}

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single('testImage')

const uploadImage = (req, res) => {
     upload(req, res, (err) => {
        if (err) {
            console.log("err")
        }
        else {
            const newImage = new imageSchema({
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                name: req.body.name
            })
            // console.log(newImage)
            newImage.save()
                .then(() => res.json({
                    message:'Success',
                    file: `uploads/${req.file.filename}`
                }))
                .catch((err) => console.log(err))
        }
    })
}

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userMail = await userSchema.findOne({ email: email });
        const token = await userMail.generateAuthToken();
        if (userMail.password === password) {
            res.status(201).send(`Login Successfully & ${token} `)
        } else {
            res.send("Invalid User1")
        }
    } catch (error) {
        res.status(400).send("Invalid User")
    }
}

const emailCode = async (req, res) => {
    try {
        let email = req.body.email
        let data = await userSchema.findOne({ email })
        const response = {};
        let otpcode = Math.floor((Math.random() * 100000) + 1)
        let otpData = new otpSchema({
            email: req.body.email,
            code: otpcode,
            expireIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save()
        if (otpResponse) {
            async function main() {
                let testAccount = await nodemailer.createTestAccount();
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });

                let info = await transporter.sendMail({
                    from: 'Fred Foo 👻" <foo@example.com>', // sender address
                    to: req.body.email,
                    // to: "rbsinghk30@gmail.com,mailto:sravankomati.vision@gmail.com,krushitsachapara.vision@gmail.com", // list of receivers
                    subject: "OTP Here ✔", // Subject line
                    html: (`Please Check the OTP for changing the password ${otpcode}`), // html body
                });
                // if (info.messageId) {
                //     res.send("email send")
                // } else {
                //     res.send("Email Not Send")
                // }

            }
            main().catch(console.error);
        }
        else {
            res.send("error")
        }

        res.status(201).send("Success")
    } catch (error) {
        res.send("Invalid email")
    }

}

const changepassword = async (req, res) => {
    try {
        let email = req.body.email
        let code = req.body.code
        const data = await otpSchema.findOne({ email })
        // const response = {}
        if (data.code === code) {
            let user = await userSchema.findOne({ email })
            user.password = req.body.password;
            let sav = await user.save()
            res.send(sav)
            if (sav) {
                let del = await otpSchema.findOneAndDelete(req.body.code)
            }
            // if(diff < 0){
            //     res.send('Token is Expire')
            // }else{
            //     let user = await userSchema.findOne({email})
            //     user.password = req.body.password;
            //     let sav = await user.save()
            //     res.send(sav)
            // }
        } else {
            res.send("Invalid OTP")
        }
    } catch (error) {
        res.status(500).send("OTP Expired")
    }
}

module.exports = {
    userAdd,
    userGet,
    uploadImage,
    userLogin,
    emailCode,
    changepassword
}