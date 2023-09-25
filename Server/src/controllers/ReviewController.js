const { Review, User, Car } = require('../db');

const postReview = async (req, res) => {
    const {rating, title, review, carId, userId} = req.body
    try {
         await Review.create({
                rating: Number(rating),
                title: title,
                review: review,
                carId: carId,
                userId: userId
        })
        
        res.status(201).json({message: 'se creo con exito'})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
};

const getReviewById = async (req, res) => {
    const {id} = req.params
    try {
        const review = await Review.findAll({
            where: {
                carId: id,
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "lastName", "image"]
                }
            ]
        });
        res.status(200).json(review) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send("successfully deleted");
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const updateReview = async (req, res) => {
    const { id, rating, title, review } = req.body;

    console.log(rating);
    try {
      let fieldsToUpdate = {};
      if (rating !== undefined && rating > 0) fieldsToUpdate.rating = rating;
      if (title !== undefined) fieldsToUpdate.title = title;
      if (review !== undefined) fieldsToUpdate.review = review;
  
      if (Object.keys(fieldsToUpdate).length > 0) {
        await Review.update(fieldsToUpdate, { where: { id: id } });
      }
  
      res.status(200).json(getReviewById)
    } catch (error) {
      res.status(500).send(console.error(error.message))
    }
  }

const getReviewByUserId = async (req, res) => {
    const {id} = req.params
    try {
        const review = await Review.findAll({
            where: {
                userId: id,
            },
            include: [
                {
                    model: Car,
                    attributes: ["id", "name", "brand", "image"]
                }
            ]
        });
        res.status(200).json(review) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            attributes: ['id', 'rating', 'carId']
        })
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

  
module.exports = {
    postReview,
    getReviewById,
    deleteReview,
    updateReview,
    getReviewByUserId,
    getAllReview,
};