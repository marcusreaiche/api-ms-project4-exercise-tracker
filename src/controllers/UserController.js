const User = require("../models/User");

class UserController {
  async store(req, res) {
    const username = req.body.username;
    
    // Check if there is an entry if that username
    const user = await User.findOne({username});
    console.log(user);
    if (user) {
      return res.status(401).json({error: "User already in database. Choose another username."});
    }
    const newUser = await User.create({
      username
    });
    
    return res.json(newUser);
  }
  
  async index(req, res) {
    const users = await User.find();
    res.json(users);
  }
}

module.exports = new UserController();