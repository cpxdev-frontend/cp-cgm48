import React from 'react'

import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AOS from "aos";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY3B4dGgyMDE3IiwiYSI6ImNsZHY0MzN6bTBjNzEzcXJmamJtN3BsZ3AifQ.mYNwWaYKsiLeYXngFDtaWQ';

const Memberlist = ({fet, setSec, width}) => {
    const mapContainer = React.useRef(null);
    const map = React.useRef(null);
    React.useEffect(() => {
        setSec('48 Group Network')
      },[])
    

    const History = useHistory()

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [100.4935089, 13.7524938],
          zoom: 3,
          maxZoom: 4,
          minZoom: 0
          });
          
          fetch('https://cpxdevapi.azurewebsites.net/bnk48/fortyeightgnetwork')
          .then(response => response.json())
          .then((res) => {
            if (map.current != null) {
              for (let i=0; i< res.response.length; i++){
                const coodinate = [res.response[i].coodinate[1], res.response[i].coodinate[0]]
                const popup = new mapboxgl.Popup()
                  .setText(res.response[i].name)
                  .addTo(map.current);
                popup.remove();
                new mapboxgl.Marker({ "color": res.response[i].theme })
                  .setLngLat(coodinate).addTo(map.current).setPopup(popup);
              }
            }
          })
          .catch(() => {});
    }, [])


 

    return ( 
        <>
        <h3 className='text-center mt-4'>48 Group Network</h3>
        <p className='text-center mt-4'>You can see our 48 Group friend bands around the world</p>
        <br />
        <div className="stage text-center">
           <Card data-aos="zoom-in">
           <div ref={mapContainer} className="map-container" />
           </Card>
        </div>
        </>
     );
}
 
export default Memberlist;
