const { User } = require("../db");

const adminInputUser = async (req, res) => {
  const { id } = req.params;
  const { ban, status, country, age, phone, name, lastName } = req.body;

  console.log(ban, status, country, age, phone, name, lastName);

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "No se encontró el usuario" });
    }

    // Actualiza el valor de 'ban' solo si está presente en la solicitud
    if (ban !== undefined) {
      user.ban = ban;
    }

    // Actualiza el valor de 'status' solo si está presente en la solicitud
    if (status !== undefined) {
      user.status = status;
    }

    if (country !== undefined) {
      user.country = country;
    }

    if (age !== undefined) {
      user.age = age;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (lastName !== undefined) {
      user.lastName = lastName;
    }


    // Guarda los cambios en la base de datos
    await user.save();

    // const allUsers = await User.findAll();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { adminInputUser };
