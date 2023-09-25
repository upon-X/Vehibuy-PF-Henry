import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, searchByQuery, getAllCars } from "../../../Redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBarDashboard() {

    const [name, setName] = useState('');
    const queryParams = useSelector((state) => state.queryParams);
    const dispatch = useDispatch();

    useEffect(() => {
                if (name !== '') {
                    const delaySearch = setTimeout( async () => {
                        queryParams.name = name;
                        await dispatch(searchByQuery(queryParams));
                        dispatch(applyFilters("queryCars"));
                    }, 1000);
                    return () => clearTimeout(delaySearch);
                } else if (name === '') {
                    const delayNotSearch = async ()  => {
                        queryParams.name = name;
                        await dispatch(getAllCars());
                        dispatch(applyFilters("originCars"));
                    };
                    delayNotSearch();
                }
            }, [dispatch, name])
    

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    

    const buttonSubmit = async () => {
        queryParams.name = value;
        await dispatch(searchByQueryFilters(queryParams));
        dispatch(applyFilterDb("FilteredEmails"));  
    }

    return (
        <div className={styles.container}>
            <input
                type="search"
                value={name}
                onChange={handleChange}
                placeholder="Search for name, brand..."
            />
            <button onClick={buttonSubmit}>SEARCH</button>
        </div>
    )
}