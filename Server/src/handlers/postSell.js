const { createSell } = require('../controllers/createSell');

const createSellHandler = async (req, res) => {
    try{
    const { Cars , date, description, amount, price } = req.body;
    console.log(Cars, "Soy el handler");

    if(
        !date ||
        !amount ||
        !price 
    ){
        return res.status(404).send({ message: 'Faltan Datos'})
    }
    const newSellCreated = await createSell(Cars , date, description, amount, price )
    return res.status(200).send(newSellCreated)
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = {createSellHandler}