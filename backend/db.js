const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/payTM", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
})

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}