const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [2, "First name must be at least 2 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "Last name must be at least 2 characters"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [6, "Username must be at least 6 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"]
    },
    status: {
        type: String,
        required: false,
    }
})

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(val => this._confirmPassword = val)

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password and confirm password must match")
    } else {
        next()
    }
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next();
        });
})

const User = mongoose.model("User", UserSchema);
module.exports = User;