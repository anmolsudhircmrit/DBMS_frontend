import React, {useEffect, useRef} from 'react';

function Map() {

    let map;

    const mapRef = useRef()
    useEffect(() => {
        mapRef.current.id = 'map';
        map = new window.MapmyIndia.Map('map', { center: [28.61, 77.23], zoomControl: true, hybrid: true, search: true, location: true });
    })

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;
        console.log(pos)
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        
        map.panTo(window.L.latLng(crd.latitude, crd.longitude))
        window.L.marker([crd.latitude, crd.longitude]).addTo(map);

       window.MapmyIndia.direction({map:map,start:"12.9569,77.7011",end:`${crd.latitude},${crd.longitude}`});
    }

    function err(e){
        console.log(e);
    }

    navigator.geolocation.getCurrentPosition(success, err, options);


    return (
        <div ref =  {mapRef} style = {{display : 'flex', height : '100%', width : '100%', background : 'grey', borderRadius : '1em'}}>
        </div>
    )
}

export default Map;