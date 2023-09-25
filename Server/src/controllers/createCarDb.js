const { Car, Brand } = require('../db');
const data = require('../../api/db.json');

const createCarDb = async (userId) => {
  const allCarsDb = data.Cars.flatMap((element) => element.models.map((element)=> element));

  for (let i = 0; i < allCarsDb.length; i++) {
    const newCar = allCarsDb[i];

    let matchingBrand = await Brand.findOne({
      where: {
        name: newCar.brand,
      },
    });

    if (!matchingBrand) {
      matchingBrand = await Brand.create({ name: newCar.brand });
    }

    console.log(userId)

    const carInstance = await Car.create({
        name: newCar.name,
        image: newCar.image,
        brand: newCar.brand,
        model: newCar.model,
        state: newCar.state,
        price: newCar.price,
        location: newCar.location,
        color: newCar.color,
        description: newCar.description,
        brandId: matchingBrand.id,
        userId: userId,
    });
  }
}



module.exports = {createCarDb};