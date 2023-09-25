const { Car, Sell, carSells} = require('../db') 

// Ruta para crear una venta con múltiples carros
const createSell = async (Cars, date, description, amount, price) => {
  try {
      // const matchingCar = await Car.findOne({
      //   where:{
      //     name: Cars.name,
      //   },
      // })

      // console.log(matchingCar, "Soy el matching");
      
      console.log(date);

      // const carInstance = await Car.create({
      //   date: newCar.date,
      //   image: newCar.image,
      //   model: newCar.model,
      //   state: newCar.state,
      //   price: newCar.price,
      //   location: newCar.location,
      //   color: newCar.color,
      //   description: newCar.description,
      //   brandId: matchingBrand.id,
      // });
      
      const newSell = await Sell.create({date, description, amount, price});
      
      console.log(newSell)
    // Crear las relaciones entre la venta y los carros en la tabla intermedia
    // for (const carId of Cars) {
    //   await carSells.create({
    //     SellId: newSell.id,
    //     CarId: carId,
    //   });
    // }
    for (carId of Cars) {
      console.log(carId.id, "id del controller");
      await carSells.create({
            SellId: newSell.id,
            CarId: carId.id,
          });
    }

    return newSell;
}catch(error){
    return error.message;
}
}

module.exports = {createSell}