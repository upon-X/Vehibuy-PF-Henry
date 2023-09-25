const { User } = require("../../db");
const { Op } = require("sequelize");

const filteredUsers = async (
  age,
  country,
  email,
  status,
  ban,
  verify,
  lastName,
  name
) => {
  try {
    const conditions = {};

    if (age) {
      conditions.age = age;
    }

    if (country) {
      conditions.country = {
        [Op.iLike]: `%${country}%`,
      };
    }

    if (status === "admin" || status === "user") {
      conditions.status = status;
    }

    if (name) {
      conditions[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${name}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${name}%`,
          },
        },
      ];
    }

    if (ban) {
      conditions.ban = ban;
    }

    if (verify) {
      conditions.verify = verify;
    }

    console.log(conditions);

    const filtersUser = await User.findAll({
      where: conditions,
    });
    return filtersUser;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  filteredUsers,
};