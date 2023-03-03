import React from 'react';
import styles from '@/styles/Home.module.css';

import Button from '@mui/material/Button';

import { useStateContext } from '@/context/StateContext';

const SearchResult = ({ loc }) => {
    const { setCoord } = useStateContext();
    const locArray = loc.place_name.split(", ")
    
    const handleClick = () => {
        setCoord({
            longitude: loc.center[0],
            latitude: loc.center[1],
            zoom: 12,
        })
    }

    return (
        <Button onClick={handleClick}>
            <div className={styles.searchResult}>
                <strong>{locArray[0]}</strong>
                <p>{locArray[1]}</p>
            </div>
        </Button>
    )
}

export default SearchResult;