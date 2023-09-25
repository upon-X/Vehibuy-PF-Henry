const {filteredUsers} = require("../controllers/filters/filtersUser");

const getFiltersHandler = async (req, res) => {
    try{
        const {age, country, email, status, ban, verify, lastName, name} = req.query;
        // console.log(name);
        const newFiltersUsers = await filteredUsers(age, country, email, status, ban, verify, lastName, name);
        return res.status(200).send(newFiltersUsers);
    } catch(error){
        return res.status(500).json(error.message)
    }
}

module.exports = {getFiltersHandler}