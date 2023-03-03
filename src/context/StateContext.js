import React, { useState, createContext, useContext, useEffect } from 'react';
import fetchAgencies from '@/pages/api/agencies';
import fetchStops from '@/pages/api/stops';
const Context = createContext();

export const StateContext = ({ children }) => {
    const [bounds, setBounds] = useState(null);
    const [agencies, setAgencies] = useState();
    const [stops, setStops] = useState();
    const [zoom, setZoom] = useState();
    const [stopData, setStopData] = useState();
    
    useEffect(() => {
        console.log(zoom);
        if (zoom > 10) {
            const getAgencies = async() => {
                const res = await fetchAgencies(bounds);
                setAgencies(res);
            }
            if (bounds) { 
                getAgencies();
            }
        }
    }, [bounds, zoom])

    useEffect(() => {
        const getStops = async(agencyQuery) => {
            const res = await fetchStops(bounds, agencyQuery);
            setStops(res);
        }

        if (agencies && agencies.data.length > 0) {
            const agenciesArray = [];
            for (let i = 0; i < agencies.data.length; i++) {
                agenciesArray.push(agencies.data[i]["agency_id"].toString())
            }
            if (agenciesArray) {
                const agencyQuery = agenciesArray.join(",");
                getStops(agencyQuery);
            }
        }
    }, [agencies])
    
    

    return (
        <Context.Provider
            value={{
                bounds, 
                setBounds,
                setStops,
                stops,
                setZoom,
                stopData,
                setStopData
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);