const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    findAll: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err))
    },

    register: (req, res) => {
        User.create(req.body)
            .then(newUser => {
                const userToken = jwt.sign({
                    id: newUser._id
                }, process.env.SECRET_KEY)

                res
                    .cookie("usertoken", userToken, { httpOnly:true })
                    .json({ message:"SUCCESSFUL REGISTRATION", user: {
                        id: newUser._id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        username: newUser.username
                    }});
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "PROBLEM WITH REGISTRATION", error: err })
            })
    },

    login: async (req, res) => {
        const user = await User.findOne({ email:req.body.email })
        if (user === null) {
            return res.status(400).json({ message: "Invalid login" })
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if (!correctPassword) {
            return res.status(400).json({ message: "Invalid login" })
        }

        const userToken = jwt.sign({
            id: user._id,
        }, process.env.SECRET_KEY)
        // console.log(userToken)

        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ message: "Successful login", userInfo: {
                id: user._id,
                firstName: user.firstName,
                username: user.username
            }});
    },
    
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    // STATUS CRUD

    update: (req,res) => {

        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((updatedStatus) => res.json(updatedStatus))
            .catch((err) =>
                res.status(400).json(err)
        );
    },

}

