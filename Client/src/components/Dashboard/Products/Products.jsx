import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "../Product/Product";
import styles from "./Products.module.css";
import { cardsLoadedTrue, deleteCarWithID, applyFilters, getAllCars, editPutCar } from "../../../Redux/actions";
import EDIT from "../Email/Icons/EDIT.svg";
import TRASH from "../Email/Icons/TRASH.svg";
import PLUS from "../Email/Icons/PLUS.svg";
import Swal from "sweetalert2";
import FiltersCar from "../Filters/FiltersCar";
import SearchBarCar from "../SearchBar/SearchBarCar";
import { Link } from "react-router-dom"
import { enqueueSnackbar } from "notistack";
import axios from 'axios'

export default function DashBoardProducts() {

    const pageFilteredDb = useSelector((state) => state.pageFiltered);
    const carsLoadeds = useSelector((state) => state.carsLoaded);
    const dispatch = useDispatch();
    const [productSelection, setProductSelection] = useState([]);
    const [rating, setRating] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const selectedProducts = Object.keys(productSelection).filter((key) => productSelection[key]);
    const selectedProductsObjects = selectedProducts.map((emailId) => {
        return { id: emailId };
    });
    const aux = selectedProductsObjects.length;

    const getReviewRating = async () => {
        try {
            const endpoint = "/review/";
            const { data } = await axios.get(endpoint);
            setRating(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        try {
            getReviewRating();
        } catch (error) {
            console.log(error);
        }
    }, []);
  
    useEffect(() => {
        if (!carsLoadeds) {
            const fetchCars = async () => {
                await dispatch(cardsLoadedTrue());
                await dispatch(getAllCars());
                await dispatch(applyFilters("originCars"));
            };
            fetchCars();
        }
    }, [carsLoadeds, dispatch])


    const handleCheckboxActionEdit = async () => {
        Swal.fire({
            title: "Select options",
            icon: "question",
            html: 
                '<select id="select-state" class="swal2-select">' +
                '<option value="Used">Used</option>' +
                '<option value="New">New</option>' +
                '</select>',
            confirmButtonText: "Accept",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonText: "Cancel",
            preConfirm: () => {
                const selectedState = document.getElementById('select-state').value;
                return {
                    state: selectedState
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const objeto = result.value;
                // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
                for (const id in productSelection) {
                await dispatch(editPutCar(objeto, id));}
                await dispatch(getAllCars());
                await dispatch(applyFilter("originCars"));
            }
        });             
    };
    
const handleCheckboxActionDelete = async () => {
    Swal.fire({
    title: "¿Are you sure?",
    text: `You are about to delete these cars from the database`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Accept",
    cancelButtonText: "Cancel",
}).then((result) => {
    if (result.isConfirmed) {
        for (const id in productSelection) {
        dispatch(deleteCarWithID(id));}
        dispatch(applyFilters("originCars"));
    }
});
};

const handleCheckboxChange = (id) => {
// Actualiza el estado de selección cuando se cambia el checkbox
setProductSelection((prevState) => ({
  ...prevState,
  [id]: !prevState[id],
}));
};

const handleSelectAllChange = () => {
  setSelectAll(!selectAll);
  pageFilteredDb.forEach((email) => {
    console.log(email.id, "emailid en checkbox");

    setProductSelection((prevState) => ({
      ...prevState,
      [email.id]: !selectAll,
    }));
  });
    
      
};

    return (
        <div>
                <SearchBarCar/>
                <div className={styles.filtersEdit}>
                    <FiltersCar/>
                    <button className={aux<2 ? styles.deleteDisabled : styles.delete} onClick={handleCheckboxActionDelete} disabled={aux<2}>
                       <img className={styles.img} src={TRASH} alt="Icon..." title="Eliminar usuario" />
                    </button>
                    <button className={aux<2 ? styles.editDisabled : styles.edit} onClick={handleCheckboxActionEdit} disabled={aux<2}>
                       <img className={styles.img} src={EDIT} alt="Icon..." title="Editar usuario" />
                    </button>
                    <Link to={`/admin/dashboard/create`}>
                        <button className={styles.create}>
                        <img className={styles.img} src={PLUS} alt="Icon..." title="Create car" />
                        </button>
                    </Link>
                </div>
            <div className={styles.emailContainer}>
                <input 
                type="checkbox" 
                checked={selectAll}
                onChange= {handleSelectAllChange}
                >
                </input>
                <div className={styles.emailItem}>Name</div>
                <div className={styles.emailItem}>Brand</div>
                <div className={styles.emailItem}>Color</div>
                <div className={styles.emailItem}>Model</div>
                <div className={styles.emailItem}>Price</div>
                <div className={styles.emailItem}>Location</div>
                <div className={styles.emailItem}>State</div>
                <div className={styles.emailItem}>Rating</div>
                <div className={styles.emailItem}>Actions</div>
            </div>
            <div>
                {
                    pageFilteredDb?.map((email) => {
                        const ratings = rating.filter((review) => review.carId === email.id);
                        
                        let promRating = 'Unrated'; 

                        for ( let i = 0; i < ratings.length; i++) {
                            const sumRatings = ratings.reduce((acc, review) => acc + review.rating, 0);
                            promRating = Math.round(sumRatings / ratings.length);
                        }
                        return (
                            <Product
                                key={email.id}
                                id={email.id}
                                name={email.name}
                                brand={email.brand}
                                color={email.color}
                                model={email.model}
                                price={email.price}
                                location={email.location}
                                state={email.state}
                                rating={promRating}
                                isChecked={productSelection[email.id] || false}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        )
                    } )
                }
            </div>
        </div>
    )
};
