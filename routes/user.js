const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/register", userController.create);

router.post("/login", userController.login); 


module.exports = router;