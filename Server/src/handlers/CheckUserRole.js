// const { User } = require("../db");

// exports.checkUserRole = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const userAdmin = await User.findOne({
//       where: {
//         id: id,
//       }
//     });

//     if (!userAdmin) {
//       return res.status(400).json({ message: "No se encontró el usuario para verificación!" });
//     }

//     if (userAdmin.status === "admin") {
//       next();
//     } else {
//       return res.status(403).json({ message: "No tienes permiso de administrador" })
//     }

//   } catch (error) {
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
// exports.checkUserRole = (type) => {
//     return (req, res, next) => {
//       // Verifica si el usuario tiene el rol adecuado
//       if (req.user && req.user.type === type) {
//         next(); // Continúa con la siguiente función si es un administrador
//       } else {
//         res.status(403).json({ message: "Acceso no autorizado" }); // Acceso no autorizado
//       }
//     };
//   };
