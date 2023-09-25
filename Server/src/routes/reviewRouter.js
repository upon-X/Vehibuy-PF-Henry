const { Router } = require("express");
const {
    postReview, 
    getReviewById, 
    deleteReview, 
    updateReview, 
    getReviewByUserId, 
    getAllReview} = require('../controllers/ReviewController');

const reviewRouter = Router();

reviewRouter.post('/', postReview);
reviewRouter.get('/:id', getReviewById)
reviewRouter.get('/', getAllReview)
reviewRouter.get('/userid/:id', getReviewByUserId)
reviewRouter.delete('/:id', deleteReview)
reviewRouter.put('/', updateReview)

module.exports = reviewRouter