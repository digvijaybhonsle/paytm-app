const express = require('express');
const userRouter = require("./user"); 
const accountRouter = require("./account")
const router = express.Router();

router.get("/user", (req, res) => {
    res.json({ message: "User endpoint reached" }); 
});


router.use('/user', userRouter); 
router.use('/account', accountRouter);

module.exports = router;