const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
          res.status(400).send({error: "Email is wrong"})
        }
      
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
          res.status(400).send({error: "Password is wrong"});
        }
      
        //create jwt token
        const token = await jwt.sign({id: user._id}, process.env.TOKEN_JWT, {expiresIn: "120s"});
        res.setHeader("x-auth-token", token);
        res.send({user, token, message: "Login successfully"});

    } catch(err) {
      return res.status(500).send(err.message);
    }
  },

  async create(req, res) {
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      let checkAvailable = await User.findOne({email: req.body.email});
      if (checkAvailable) {
        res.status(400).send({error: "email already available"})
      }
      console.log('munmun', checkAvailable);

      const savedUser = await User.create(req.body);
      
      res.send({ error: null, data: savedUser });
    } catch (error) {
      res.status(400).json({ error: "api not save user record" });
    }
  },

}
