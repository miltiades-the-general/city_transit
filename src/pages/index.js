import React from "react";
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';

import { useStateContext } from "@/context/StateContext";
import MapBox from '../components/Mapbox';
import MapBar from '../components/MapBar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
  const { stopData } = useStateContext();

  // Set the backdrop open on click of the about button and off on click
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      { open ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <Paper sx={{ padding: "1.5rem", height: "300px", width: "400px", color: "white", backgroundColor: "#2a2a61" }}>
            <h1>Facts About Trains</h1>
            <ul style={{ marginTop: "1rem", listStyle: "circle" }}>
              <li>The word Train comes from a French verb which means to draw or drag.</li>
              <li>Modern bullet trains can now travel more than 300 mph.</li>
              <li>The first American locomotive lost to a horse.</li>
              <li>In Japan, trains are so punctual that if a train arrives 5 minutes late, the crew personally apologizes to each passenger.</li>
              <li>Australia has the straightest railway path in the world at 478km long.</li>
              <li>Facts courtesy of facts.net</li>
            </ul>
          </Paper>
        </Backdrop>
      ) : (<></>)}
      <Head>
        <title>CityTrans</title>
        <meta name="description" content="An app to check live transportation options" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>CityTrans</h1>
          <a style={{ cursor: "pointer" }}onClick={handleToggle}>About</a>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <div className={styles.appbar}>
            <MapBar setLat={setLat} setLng={setLng}/>
          </div>
          <div className={styles.center}>
            <Paper sx={{ padding: "2rem", width: "300px", height: "400px", backgroundColor: "#2a2a61" }}>
              <h1 style={{ color: "white", textDecoration: "underline solid white"}}>Train Stop Information:</h1>
              { stopData ? (
                <div style={{ color: "white" }}>
                  <h1 style={{ fontSize: "26px", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>Name: {stopData.name ? stopData.name : ""}</h1>
                  <h1 style={{ fontSize: "24px", paddingBottom: "0.5rem" }}>Location: {stopData.lat ? `${stopData.lat}, ${stopData.lng}` : ""} </h1>
                  <h1 style={{ fontSize: "24px", paddingBottom: "0.5rem" }}>Location Type: {stopData.locationtype ? stopData.locationtype : ""}</h1>
                  <h1 style={{ fontSize: "24px", paddingBottom: "0.5rem" }}>Agency ID: {stopData.agencyid ? stopData.agencyid : ""}</h1>
                  <h1 style={{ fontSize: "24px", paddingBottom: "0.5rem" }}>Stopid: {stopData.stopid ? stopData.stopid : ""}</h1>
                </div>
              ) : (
                <div></div>
              )
              }
            </Paper>
            <MapBox/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
