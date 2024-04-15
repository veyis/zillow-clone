'use client'

import { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = ({ locations }) => {
  const containerStyle = {
    width: '100%',
    height: '90%'
  };

  const center = {
    lat: locations[0].latitude,
    lng: locations[0].longitude
  };

  const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(new window.google.maps.LatLng(location.latitude, location.longitude));
    });
    map.fitBounds(bounds);
    setMap(map);
  }, [locations]); // Include locations in dependencies

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []); // No dependencies needed here

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
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
