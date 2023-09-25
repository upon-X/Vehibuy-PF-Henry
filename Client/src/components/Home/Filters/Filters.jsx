import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    applyFilters,
    brandByQuery,
    brandLoadedTrue,
    colorByQuery,
    colorsLoadedTrue,
    locationByQuery,
    locationLoadedTrue,
    searchByQuery
} from '../../../Redux/actions';
import styles from "./Filters.module.css";
import ICONDOWN from "./Icons/ICONDOWN.png";
import ICONUP from "./Icons/ICONUP.png";
import { alertFilterValues } from '../../NotiStack';

export default function Filters() {

    const [state, setState] = useState('');
    const [price, setPrice] = useState({
        price: "",
        min: "",
        max: ""
    });
    const [brands, setBrands] = useState('');
    const [colors, setColors] = useState('');
    const [locations, setLocations] = useState('');

    const [showAllBrands, setShowAllBrands] = useState('');
    const [showAllColors, setShowAllColors] = useState('');

    const dispatch = useDispatch();

    const queryParams = useSelector((state) => state.queryParams);
    const brandQuerys = useSelector((state) => state.filtereds.brandQuery);
    const colorQuerys = useSelector((state) => state.filtereds.colorQuery);
    const locationQuerys = useSelector((state) => state.filtereds.locationQuery);

    const brandLoadeds = useSelector((state) => state.brandLoaded);
    const colorLoadeds = useSelector((state) => state.colorsLoaded);
    const locationLoadeds = useSelector((state) => state.locationLoaded);

    const handleChangeState = async (e) => {
        const { value } = e.target;

        // Si la opción seleccionada es igual a la condición actual, deseleccionarla
        if (value === state) {
            setState('');
            queryParams.state = '';
        } else {
            setState(value);
            queryParams.state = value;
        }

        await dispatch(searchByQuery(queryParams)); // Llamar después de actualizar queryParams
        dispatch(applyFilters("queryCars"));
    };

    const handleChangePrice = async (e) => {
        const { value, checked, name } = e.target;

        // Define un objeto que mapea los valores de los checkboxes a las acciones
        const priceActions = {
            "50000": { minPrice: "", maxPrice: checked ? "50000" : "" },
            "50000 - 300000": { minPrice: checked ? "50000" : "", maxPrice: checked ? "300000" : "" },
            "300000": { minPrice: checked ? "300000" : "", maxPrice: "" },
        };

        // Obtiene las acciones correspondientes al valor del checkbox
        const actions = priceActions[value];

        if (actions) {
            // Actualiza el estado price con las acciones
            setPrice({
                ...price,
                price: checked ? value : "",
                min: "",
                max: "",
            });

            // Actualiza los queryParams con las acciones
            queryParams.minPrice = actions.minPrice;
            queryParams.maxPrice = actions.maxPrice;
            await dispatch(searchByQuery(queryParams));
            dispatch(applyFilters("queryCars"));
        }
    };

    useEffect(() => { // Si los estados Loadeds son undifined se hace la solicitud para obtener Marcas, Colores, Locacion
        const fetchBrand = async () => {
            if (!brandLoadeds) {
                await dispatch(brandByQuery());
                dispatch(brandLoadedTrue());
            } else if (!colorLoadeds) {
                await dispatch(colorByQuery());
                dispatch(colorsLoadedTrue());
            } else if (!locationLoadeds) {
                await dispatch(locationByQuery());
                dispatch(locationLoadedTrue());
            }
        }
        fetchBrand();
    }, [brandLoadeds, colorLoadeds, locationLoadeds, dispatch]);

    const handleChangeBrand = async (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setBrands(value);
            queryParams.brand = value;
        } else {
            setBrands("");
            queryParams.brand = "";
        }

        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    };

    const handleChangeColor = async (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setColors(value);
            queryParams.color = value;
        } else {
            setColors("");
            queryParams.color = "";
        }

        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    }

    const handleChangeLocation = async (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setLocations(value);
            queryParams.location = value;
        } else {
            setLocations("");
            queryParams.location = "";
        }

        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    }

    const handleChangeClearFilters = async () => {

        queryParams.name = "";
        queryParams.state = "";
        setState("");
        queryParams.minPrice = "";
        queryParams.maxPrice = "";
        setPrice({ price: "", min: "", max: "" }); // Actualiza el estado del objeto price
        queryParams.brand = "";
        setBrands("");
        queryParams.color = "";
        setColors("");
        queryParams.location = "";
        setLocations("");

        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("originCars"));
    }

    const handleFiltersPrecies = async (e) => {
        const { value, name } = e.target;

        // Verificar si el valor es numérico
        if (name === "min" || name === "max") {
            setPrice({ ...price, [name]: value });
            console.log(price)
        }
    };


    const handleSubmitPrice = async () => {
        if (price.min !== "" && price.max !== "" && Number(price.min) > Number(price.max)) {
            return alertFilterValues();
        }

        if (price.min !== "") {
            queryParams.minPrice = price.min;
        } else {
            queryParams.minPrice = "";
        }

        if (price.max !== "") {
            queryParams.maxPrice = price.max;
        } else {
            queryParams.maxPrice = "";
        }

        price.price = "";

        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    };


    const toggleShowAllBrands = () => {
        setShowAllBrands(!showAllBrands);
    }

    const toggleShowAllColors = () => {
        setShowAllColors(!showAllColors);
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <button className={styles.buttonCF} onClick={handleChangeClearFilters}>CLEAR FILTERS</button>
                <h3>State</h3>
                <label>
                    <input
                        type="checkbox"
                        value="New"
                        checked={state === "New"}
                        onChange={handleChangeState} />
                    New
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Used"
                        checked={state === "Used"}
                        onChange={handleChangeState} />
                    Used
                </label>
            </div>
            <div className={styles.column}>
                <h3>Price</h3>
                <label>
                    <input
                        type="checkbox"
                        value="50000"
                        name="price"
                        checked={price.price === "50000"}
                        onChange={handleChangePrice} />
                    Up to <b>$50.000</b>
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="50000 - 300000"
                        name="price"
                        checked={price.price === "50000 - 300000"}
                        onChange={handleChangePrice} />
                    <b>$50.000</b> to <b>$300.000</b>
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="300000"
                        name="price"
                        checked={price.price === "300000"}
                        onChange={handleChangePrice} />
                    Over <b>$300.000</b>
                </label>
                <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    name="min"
                    value={price.min}
                    placeholder="Minimum..."
                    onChange={handleFiltersPrecies} />
                <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    name="max"
                    placeholder="Maximum..."
                    onChange={handleFiltersPrecies} />
                <button className={styles.button} onClick={handleSubmitPrice}>Search</button>
            </div>
            <div className={styles.column}>
                <h3>Brand</h3>
                {
                    brandQuerys.slice(0, showAllBrands ? undefined : 5)?.map((brand) => (
                        <label key={brand.id}>
                            <input
                                type="checkbox"
                                value={brand.name}
                                checked={brands === brand.name}
                                onChange={handleChangeBrand}
                            />
                            {brand.name}
                        </label>
                    ))
                }
            </div>
            {brandQuerys.length > 5 && (
                <button onClick={toggleShowAllBrands} className={styles.buttonToggle}>
                    {showAllBrands ? (
                        <>
                            Show less <img className={styles.iconF} src={ICONUP} alt="IconU..." />
                        </>
                    ) : (
                        <>
                            Show more <img className={styles.iconF} src={ICONDOWN} alt="IconD..." />
                        </>
                    )}
                </button>
            )}
            <div className={styles.column}>
                <h3>Color</h3>
                {
                    colorQuerys.slice(0, showAllColors ? undefined : 5)?.map((color) => (
                        <label key={color}>
                            <input
                                type="checkbox"
                                value={color}
                                checked={colors === color}
                                onChange={handleChangeColor}
                            />
                            {color}
                        </label>
                    ))
                }
            </div>
            {colorQuerys.length > 5 && (
                <button onClick={toggleShowAllColors} className={styles.buttonToggle}>
                    {showAllColors ? (
                        <>
                            Show less <img className={styles.iconF} src={ICONUP} alt="IconU..." />
                        </>
                    ) : (
                        <>
                            Show more <img className={styles.iconF} src={ICONDOWN} alt="IconD..." />
                        </>
                    )}
                </button>
            )}
            <div className={styles.column}>
                <h3>Location</h3>
                {
                    locationQuerys?.map((location) => (
                        <label key={location}>
                            <input
                                type="checkbox"
                                value={location}
                                checked={locations === location}
                                onChange={handleChangeLocation}
                            />
                            {location}
                        </label>
                    ))
                }
            </div>
        </div>
    )
}