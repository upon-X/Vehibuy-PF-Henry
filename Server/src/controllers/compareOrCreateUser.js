const { User } = require("../db");

const compareOrCreateUser = async ({
  email,
  uid,
  name,
  image,
  tel,
  age,
  lastName,
  status,
  country,
}) => {
  return await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      password: uid,
      name,
      image,
      tel,
      age,
      lastName,
      status,
      country,
    },
  });
};
module.exports = { compareOrCreateUser };
