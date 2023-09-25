import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postReview, getReviews, resetReview, deleteReview, updateReview } from '../../../../Redux/actions';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineStar, AiFillStar, AiFillEdit } from 'react-icons/ai'
import { postReviewNoti, deleteReviewNoti, updateReviewNoti, errorReviewNoti } from '../../../NotiStack';
import axios from 'axios'
import styles from './Review.module.css'

const Review = () => {
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
  const detail = useSelector((state) => state.detail);
  const reviews = useSelector((state) => state.reviews)
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(0);
  const [purchases, setPurchases] = useState([])
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({})
  const [buyCars, setBuyCars] = useState(false)
  const [check, setCheck] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const idUser = loggedUser?.response?.id
  const idCar = detail.id

  const validate = () => {
    let errors = {}

    if (!data.rating) {
      errors.rating = 'The rating cannot be empty';
    } else if (isNaN(data.rating) || data.rating < 1 || data.rating > 5) {
      errors.rating = 'Rating must be a number between 1 and 5';
    }

    if (!data.title) {
      errors.title = 'The title cannot be empty';
    } else if (data.title.length > 20) {
      errors.title = 'The title must not exceed 20 characters';
    }

    if (!data.review) {
      errors.review = 'The review cannot be empty'
    }

    if (Object.keys(errors).length === 0) {
      setDisabled(false)
      setError(null)
    } else {
      setError(errors)
    }
  };
  console.log(error);
  const getPurchasesHandler = async (idUser) => {
    try {
      const endpoint = "/buy/getByuser/";
      const { data } = await axios.get(`${endpoint}${idUser}`);
      setPurchases(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getPurchasesHandler(idUser);
    } catch (error) {
      console.log(error);
    }
  }, [idUser]);

  const getCarId = async (userId) => {
    try {
      for (const purchase of purchases) {
        if (purchase.userId === userId) {
          const endpoint = `/buy/detail/${purchase.id}`;
          const { data } = await axios.get(endpoint);
          for (const idCars of data) {
            if (idCars.id === idCar) {
              setBuyCars(true)
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      resetReview()
      getCarId(idUser);
    } catch (error) {
      console.log(error);
    }
  }, [idUser, purchases]);

  useEffect(() => {
    const checkUserReview = async () => {
      const hasUserReviewed = await reviews.some((review) => review.User.id === idUser);

      if (hasUserReviewed) {
        setError({ userId: 'You have already published a review.' });
        setCheck(true)
      }
    };

    checkUserReview();
  }, [reviews, idUser])

  useEffect(() => {
    dispatch(getReviews(idCar))
  }, [idCar])

  useEffect(() => {
    if (idCar && idUser) {
      setData({
        ...data,
        carId: idCar,
        userId: idUser
      })
    }
  }, [idCar, idUser])

  const handleRating = (event, ratingValue, id) => {
    event.preventDefault();
    setRating(ratingValue);
    setNewData({
      ...newData,
      id: id,
      rating: ratingValue
    })
  }

  const handleChange = (event) => {
    setData({
      ...data,
      rating: rating,
      [event.target.name]: event.target.value,
    })
    validate()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error) {
      errorReviewNoti()
      setData({
        rating: "",
        title: "",
        review: "",
        carId: idCar,
        userId: idUser,
      });
      setRating(0);
    } else if (!error) {
      await dispatch(postReview(data));
      await dispatch(resetReview());
      await dispatch(getReviews(idCar));
      setData({
        rating: "",
        title: "",
        review: "",
        carId: idCar,
        userId: idUser,
      });
      setRating(0);
      postReviewNoti();
    }
  }

  const handleDelete = async (id) => {
    await dispatch(deleteReview(id))
    await dispatch(resetReview())
    await dispatch(getReviews(idCar))
    deleteReviewNoti()
    setDisabled(true)
    setError()
    setCheck(false)
  }

  const handleDeleteConfirmation = (id) => {
    setShowConfirmation(id);
  };

  const handleConfirmationYes = async (id) => {
    setShowConfirmation(false);
    handleDelete(id)
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  const handleUpdate = (review) => {
    setEditingReview(review);
  }

  const handleUpdateChange = (event, id) => {
    event.preventDefault()
    setNewData({
      ...newData,
      id: id,
      [event.target.name]: event.target.value,
    });
  }

  const handleUpdateSubmit = async () => {
    await dispatch(resetReview())
    await dispatch(updateReview(newData))
    await dispatch(getReviews(idCar))
    setEditingReview(null);
    setNewData({})
    setCheck(true)
    updateReviewNoti()
  }

  return (
    <div className={styles.detail_review}>
      <div className={styles.formReview}>
        {idUser && buyCars === true && <form className={styles.form} onSubmit={handleSubmit}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <div className={styles.radio_star} key={i}>
                <input
                  className={styles.input}
                  type="radio"
                  id={`star${i}`}
                  name="rating"
                  value={ratingValue}
                  checked={rating === ratingValue}
                  onClick={(event) => handleRating(event, ratingValue)}
                  style={{ display: 'none' }}
                />
                <label
                  className={styles.star_label}
                  htmlFor={`star${i}`}
                  onClick={(event) => handleRating(event, ratingValue)}>{i + 1 <= rating ? <AiFillStar /> : <AiOutlineStar />}</label>
              </div>
            );
          })}<br />
          <div>
            <input className={styles.input} type="text" name='title' onChange={handleChange} value={data.title} placeholder='Title:' />
            <textarea className={styles.textarea} name="review" value={data.review} onChange={handleChange} placeholder='Review:' cols="5" rows="3"></textarea>
          </div>
          {check === false && <button disabled={disabled} type="submit" className={disabled ? styles.btn_disabled : styles.btn_submit}>Submit Review</button>}
          {error && <span>{error.rating || error.title || error.review}</span>}
        </form>}
      </div> <br />
      <div className={styles.Review_Seccion}>
          <span className={styles.Review_Title}>Review: </span><br />
        <div>
          {reviews && [...reviews].reverse().map((review, index) => (
            <div key={index}>
              {editingReview === review.id ? (
                <form className={styles.form} onSubmit={handleUpdateSubmit}>
                  {[...Array(5)].map((start, i) => {
                    const ratingValue = i + 1;
                    return (
                      <div className={styles.radio_star} key={i}>
                        <input
                          type="radio"
                          id={`star${i}`}
                          name="rating"
                          value={ratingValue}
                          className={styles.input}
                          checked={newData.rating === ratingValue}
                          onClick={(event) => handleRating(event, ratingValue)}
                          style={{ display: 'none' }}
                        />
                        <label
                          className={styles.star_label}
                          htmlFor={`star${i}`}
                          onClick={(event) => handleRating(event, ratingValue, review.id)} placeholder={review.rating} >{i + 1 <= rating ? <AiFillStar /> : <AiOutlineStar />}</label>
                      </div>
                    );
                  })}
                  <input className={styles.input} maxLenght={20} type="text" name="title" value={newData.title} onChange={(event) => handleUpdateChange(event, review.id)} placeholder={review.title} />
                  <input className={styles.input} maxLenght={300} type="text" name="review" value={newData.review} onChange={(event) => handleUpdateChange(event, review.id)} placeholder={review.review} />
                  <button type="submit" className={styles.btn_update_review}>Update Review</button>
                </form>
              ) : (
                <div className={styles.review_render}>
                  {idUser === review.User.id && <button className={styles.btn_edit} onClick={() => handleUpdate(review.id)}>Edit Review <AiFillEdit /></button>}
                  <img src={review.User.image} alt="imgprofile" className={styles.image} />
                  {review.User && <span className={styles.name}>{`${review.User.name} ${review.User.lastName}`}</span>} <br />
                  {[...Array(review.rating)].map((star, i) => {
                    return (
                      <label className={styles.star_label} key={i} >{i + 1 <= review.rating ? <AiFillStar /> : <AiOutlineStar />}</label>
                    );
                  })}
                  <br />
                  <span className={styles.title}>{review.title}</span><br />
                  <span className={styles.review}>{review.review}</span><br />
                  {idUser === review.User.id && <button className={styles.btn_delete} onClick={() => handleDeleteConfirmation(review.id)}>Delete</button>}
                </div>
              )}
              {showConfirmation === review.id && (
                <Alert className={styles.alert} variant="warning">
                  <h3 >Are you sure to delete this review? This action cannot be undone!</h3>
                  <Button variant="secondary" className={styles.btn_no} onClick={handleConfirmationNo} >
                    No
                  </Button>
                  <Button variant="danger" className={styles.btn_yes} onClick={() => handleConfirmationYes(review.id)} >
                    Yes
                  </Button>
                </Alert>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Review;