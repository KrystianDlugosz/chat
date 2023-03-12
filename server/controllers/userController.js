const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Nazwa użytkownika jest zajęta", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Ten email został już użyty", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        msg: "Nieprawidłowa nazwa użytkownika.",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Nieprawidłowe hasło.", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(userId, {
//       avatarImage,
//     });
//     console.log(JSON.stringify(userData));
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };


module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    console.log(JSON.stringify(isAvatarImageSet));
    return res.json({
      isSet: userData.isAvatarImageSet, 
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
