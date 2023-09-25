import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { 
    searchByQueryFilters, 
    applyFilterDb, 
    applyFilters,
    brandByQuery,
    brandLoadedTrue,
    colorByQuery,
    colorsLoadedTrue,
    locationByQuery,
    locationLoadedTrue,
    searchByQuery } from "../../../Redux/actions";
import styles from "./Filters.module.css";
    
    export default function Filters() {

    const [color, setColor] = useState([]);
    const [model, setModel] = useState([]);
    const [location, setLocation] = useState([]);
    
    const [state, setState] = useState('');
    const [colors, setColors] = useState('');
    const [models, setModels] = useState('');
    const [locations, setLocations] = useState('');
    const dispatch = useDispatch();
    
    const queryParams = useSelector((state) => state.queryParams);
    const brandLoadeds = useSelector((state) => state.brandLoaded);
    const colorLoadeds = useSelector((state) => state.colorsLoaded);
    const locationLoadeds = useSelector((state) => state.locationLoaded);
    
    // const [price, setPrice] = useState({
    //     price: "",
    //     min: "",
    //     max: ""
    // });
    // const [verify, setVerify] = useState('');
    // const [minPrice, setMinPrice] = useState('');
    // const [maxPrice, setMaxPrice] = useState('');


    
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

useEffect(() => {
    const fetchCountriesDashboard = async () => {
        const endpoint = "/car";
            try {
                const { data } = await axios(endpoint);
                console.log(data,"soy data dashboard"); 
                const locationNamesDashB = data.map(
                    (cars) => cars.location
                    );               
                    const uniqueLocation = [...new Set(locationNamesDashB)]
                    await uniqueLocation.sort((a, b) => a.localeCompare(b));
                    setLocation(uniqueLocation)
                } catch (error) {
                    console.error(error);
                };
            };
            fetchCountriesDashboard();
        }, [])
        
        useEffect(() => {
            const fetchCountriesDashboard = async () => {
                const endpoint = "/car";
            try {
                const { data } = await axios(endpoint);
                console.log(data, "soy data dashboard 2");
                const modelNamesDashB = data.map((cars) => cars.model);
                
                // Función de comparación personalizada para ordenar numéricamente
                const customSort = (a, b) => {
                    return parseInt(a, 10) - parseInt(b, 10);
                };
                
                const uniqueModel = [...new Set(modelNamesDashB)];
                uniqueModel.sort(customSort); // Ordena numéricamente
                
                setModel(uniqueModel);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCountriesDashboard();
    }, []);
    
    useEffect(() => {
        const fetchCountriesDashboard = async () => {
            const endpoint = "/car";
            try {
                const { data } = await axios(endpoint);
                console.log(data,"soy data dashboard 2"); 
                const colorNamesDashB = data.map(
                    (cars) => cars.color
                    );
                    const uniqueColor = [...new Set(colorNamesDashB)]
                    await uniqueColor.sort((a, b) => a.localeCompare(b));
                    setColor(uniqueColor)
                } catch (error) {
                    console.error(error);
                };
            };
            fetchCountriesDashboard();
        }, [])
        
        
        
        const handleChangeColor = async (e) => {
            const { value } = e.target;
            
            if (value !== 'default') {
                setColors(value);
                queryParams.color = value;
            } else {
                setColors("default");
                queryParams.color = "";
            }
            
            await dispatch(searchByQuery(queryParams));
            dispatch(applyFilters("queryCars"));
        }
        
        const handleChangeModel = async (e) => {
        const { value } = e.target;
        
        if (value !== 'default') {
            setModels(value);
            queryParams.model = value;
        } else {
            setModels("default");
            queryParams.model = "";
        }
        
        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    }
    
    const handleChangeLocation = async (e) => {
        const { value } = e.target;
        
        if (value !== 'default') {
            setLocations(value);
            queryParams.location = value;
        } else {
            setLocations("default");
            queryParams.location = "";
        }
        
        await dispatch(searchByQuery(queryParams));
        dispatch(applyFilters("queryCars"));
    }
    
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
    
    //   const handleSelectVerify = (event) => {
    //     setVerify(event.target.value);
    //   };
    // const handleChangePrice = async (e) => {
        //     const { value, checked, name } = e.target;
        
        //     // Define un objeto que mapea los valores de los checkboxes a las acciones
        
        //     // Obtiene las acciones correspondientes al valor del checkbox
        //     const actions = priceActions[value];
        
        //     if (actions) {
            //         // Actualiza el estado price con las acciones
            //         setPrice({
                //             ...price,
                //             price: checked ? value : "",
                //             min: "",
                //             max: "",
    //         });

    //         // Actualiza los queryParams con las acciones
    //         queryParams.minPrice = actions.minPrice;
    //         queryParams.maxPrice = actions.maxPrice;
    //         await dispatch(searchByQuery(queryParams));
    //         dispatch(applyFilters("queryCars"));
    //     }
    // };
    // const handleFiltersPrecies = async (e) => {
        //     const { value, name } = e.target;
        
        //     // Verificar si el valor es numérico
    //     if (name === "min" || name === "max") {
    //         setPrice({ ...price, [name]: value });
    //         console.log(price)
    //     }
    // };
    
    // const handleSubmitPrice = async () => {
        //     if (price.min !== "" && price.max !== "" && Number(price.min) > Number(price.max)) {
            //         console.log(price)
            //         return alert("");
            //     }
            
            //     if (price.min !== "") {
                //         queryParams.minPrice = price.min;
                //     } else {
                    //         queryParams.minPrice = "";
                    //     }
                    
                    //     if (price.max !== "") {
                        //         queryParams.maxPrice = price.max;
                        //     } else {
    //         queryParams.maxPrice = "";
    //     }

    //     price.price = "";

    //     await dispatch(searchByQuery(queryParams));
    //     dispatch(applyFilters("queryCars"));
    // };

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <p>Color: </p>
                <select onChange={handleChangeColor} value={colors}>
                    <option value="default">Default</option>
                    {
                        color?.filter((color) => color !== "").map((color, index) => (
                            <option key={index} value={color}>
                                {color}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.filters}>
                <p>Model: </p>
                <select onChange={handleChangeModel} value={models}>
                    <option value="">Default</option>
                    {
                        model?.map((model, index) => (
                            <option key={index} value={model}>
                                {model}
                            </option>
                        ))
                    }
                </select>
            </div>
            
            {/* <div className={styles.dropdown}>
                <p>Price: </p>
                <select onChange={handleSelectVerify}>
                    <option value="">Default</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                </select>
                         {verify === 'min' && (
                 <div className={styles.dropdown}>
                 <input
                   type="text"
                   placeholder="Enter minimum price"
                   value={minPrice}
                   onChange={(e) => setMinPrice(e.target.value)}
                 />
                 </div>
               )}
               {verify === 'max' && (
                 <div className={styles.dropdown}>
                 <input
                   type="text"
                   placeholder="Enter maximum price"
                   value={maxPrice}
                   onChange={(e) => setMaxPrice(e.target.value)}
                 />
               </div>
               )}
               <button className={styles.filters} onClick={handleSubmitPrice}>Search</button>
            </div>  */}
            
            <div className={styles.filters}>
                <p>Location: </p>
                <select onChange={handleChangeLocation} value= {locations}>
                    <option value="">Default</option>
                    {
                        location?.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.filters}>
                <p>State: </p>
                <select onChange={handleChangeState} value={state}>
                    <option value="">Default</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                </select>
            </div>
        </div>
    )
}