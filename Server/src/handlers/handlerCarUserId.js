const { getCarByUserId } = require('../controllers/getCarByUserId')

const handlerCarUserId = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const response = await getCarByUserId(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { handlerCarUserId }
