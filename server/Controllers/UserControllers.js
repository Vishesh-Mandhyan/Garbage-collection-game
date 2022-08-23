const user = require("../Models/userModel");
const bcrypt = require("bcrypt");

// function to route register to save users information

module.exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      name,
      email,
      password: hashedPassword,
      score: [],
    });
    delete password;
    return res.json({ status: true, User });
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
    next(error.message);
  }
};

// functon to login route to check authentication details and login the user

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const User = await user.findOne({ email });
    if (User) {
      const ValidPassword = await bcrypt.compare(password, User.password);
      if (ValidPassword) {
        return res.json({ status: true, User });
      }
      return res.json({ status: false, error: "Email or Password is Invalid" });
    } else {
      return res.json({ status: false, error: "User not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, error });
  }
};

//setting scores

module.exports.setScore = async (req, res, next) => {
  const userID = req.body.userID;
  const currentScore = req.body.currentScore;
  try {
    const player = await user.findOne({userID})
    const UserData = await user.findOneAndUpdate({userID}, {
      score: [...player.score, currentScore],
    });
    return res.json({ status: true, UserData });
  } catch (error) {
    res.json({ staus: false, error });
  }
};
