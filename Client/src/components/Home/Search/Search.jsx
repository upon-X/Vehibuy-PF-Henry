import React, { useEffect } from 'react'
import { useState } from "react";
// import searchInput from "./searchInput.svg";
import styles from "./Search.module.css"
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, orderFilters, searchByQuery, getAllCars } from '../../../Redux/actions';

export default function InputAndSearchFor() {

    const [name, setName] = useState('');
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const queryParams = useSelector((state) => state.queryParams);

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    useEffect(() => {
        if (name !== '') {
            const delaySearch = setTimeout( async () => {
                queryParams.name = name;
                await dispatch(searchByQuery(queryParams));
                dispatch(applyFilters("queryCars"));
                setFilter('Defect')
            }, 1000);
            return () => clearTimeout(delaySearch);
        } else if (name === '') {
            const delayNotSearch = async ()  => {
                queryParams.name = name;
                await dispatch(getAllCars());
                dispatch(applyFilters("originCars"));
                setFilter('Defect');
            };
            delayNotSearch();
        }
    }, [dispatch, name])


    const handleSelectFilter = (e) => {
        const { value } = e.target;
        setFilter(value);
        dispatch((orderFilters(value)))
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerSearch}>
                <input
                    className={styles.input}
                    type="search"
                    placeholder="Search..."
                    value={name}
                    onChange={handleChange}
                />
                {/* <img className={styles.searchI} onClick={handleClickByQuery} src={searchInput} alt="searchInput" /> */}
            </div>
            <div className={styles.orden}>
                <p>Sort by </p>
                <select className={styles.select} value={filter} onChange={handleSelectFilter}>
                    <option value="Defect">Default</option>
                    <option value="Lower">Lower price</option>
                    <option value="Higher">Higher price</option>
                </select>
            </div>
        </div>
    );
}