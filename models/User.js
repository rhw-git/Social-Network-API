// require for mongoos function
const {Schema, model} = require("mongoose");
// schema for User model
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: "User Name is required",
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: "Email is required",
        // matchvalid email
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    }
});
// create User with UserSchema
const User = model("User", UserSchema);
// export the User model
module.exports = User;