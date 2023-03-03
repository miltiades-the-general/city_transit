import * as React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import "mapbox-gl/dist/mapbox-gl.css";

import { useStateContext } from '@/context/StateContext';

const MAPBOX_GL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN

function MapBox() {
  const { setBounds, setStops, stops, setZoom, setStopData } = useStateContext();
  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  React.useEffect(() => {
    mapboxgl.accessToken = MAPBOX_GL_ACCESS_TOKEN;
    // instantiate the mapbox object
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.6298, 41.871],
      zoom: 12
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    
    map.addControl(geocoder);
  
    setMap(map);
  
    return () => map.remove();
    

  }, []);

  React.useEffect(() => {
    if (map) {
      // Update the bounds whenever the map is moved
      const onMoveEnd = () => {
        const bounds = map.getBounds();
        const zoom = map.getZoom();
        setBounds(bounds);
        setZoom(zoom);
      };
      map.on('moveend', onMoveEnd);

      // Clean up the event listener when the component is unmounted
      return () => {
        map.off('moveend', onMoveEnd);
      };
    }
  }, [map]);

  React.useEffect(() => {
    if (map && stops && stops.data.length > 0) {
      // Create an array to store the markers
      const markers = [];
    
      // Add a marker for each data point
      try {
        // Add a marker for each data point
        stops.data.forEach((dataPoint) => {
          const marker = new mapboxgl.Marker({ color: "red", clickable: true })
            .setLngLat([dataPoint.location.lng, dataPoint.location.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3 style="color: black">${dataPoint.name}</h3>`))
            .addTo(map); // Add the marker to the map
          // Add a "click" event listener to the marker
          marker.getElement().addEventListener('click', () => {
            console.log('Marker clicked:', dataPoint); // Log the dataPoint object to the console for debugging
            
            // When the marker is clicked, get the data from its properties and set the marker data to its data props
            const data = {
              lng: dataPoint.location.lng,
              lat: dataPoint.location.lat,
              name: dataPoint.name,
              stopid: dataPoint.stop_id,
              locationtype: dataPoint.location_type,
              agencyid: dataPoint.agency_ids[0]
            }
            setStopData(data);
          });

          markers.push(marker); // Add the marker to the array
        });
      } catch (error) {
        console.error('Error adding markers:', error); // Log any errors to the console for debugging
      }
      
      // Store the markers in state
      setMarkers(markers);
    }
  }, [map, stops]);

  React.useEffect(() => {
    if (map && markers) {
      const handleMoveEnd = () => {
        markers.forEach((marker) => {
          marker.remove();
        });
        
        setMarkers([]); // Clear the markers from state
      };
      
      // Add the 'moveend' event listener to the map
      map.on('moveend', handleMoveEnd);
      
      return () => {
        map.off('moveend', handleMoveEnd); // Remove the event listener when the component unmounts
      };
    }
  }, [map, markers]);

  return (
    <div>
        <div id="map" style={{position: 'relative', width: '600px', height: '400px'}}/>
    </div>
  );
}

export default MapBox;