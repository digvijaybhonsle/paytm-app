const express = require('express');
const userRouter = require("./user"); 
const router = express.Router();

router.get("/user", (req, res) => {
    res.json({ message: "User endpoint reached" }); 
});


router.use('/user', userRouter); 

module.exports = router;