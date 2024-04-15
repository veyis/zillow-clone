'use client'

import { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = ({ locations }) => {
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  console.log("myLocations:",locations);

  
  // Check if there are any locations, and if not, use default center
  const center =  {
      lat: locations[0]?.latitude,
      lng: locations[0]?.longitude
  } 

  const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    map.setZoom(7);
    setMap(map)
  }, []); // No dependencies needed



  const onUnmount = useCallback(map =>  {
    setMap(null);
  }, []); // No dependencies needed here

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location,_index) => (
            <Marker
              key={_index }
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: image,
                anchor: new window.google.maps.Point(15, 15)
              }}
            />
          ))}
        </GoogleMap>
      ) : <div>Loading...</div>}
    </>
  );
};

export default memo(Map);
