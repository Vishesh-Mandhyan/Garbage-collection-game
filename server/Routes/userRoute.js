const {register,login,setScore} = require('../controllers/userControllers')
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setscore", setScore);

module.exports=router;