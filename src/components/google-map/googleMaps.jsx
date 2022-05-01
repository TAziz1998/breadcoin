import React from 'react';
import GoogleMapReact from 'google-map-react'
import Geocode from "react-geocode";

const mapCenter = {
  lat: 52.2297,
  lng: 21.0122,
}

const GMAPS_API_KEY = 'AIzaSyBEn3ztSDotuikxV2LZPBz8bmGgQ0Tikm4'

function GoogleMaps({ center = mapCenter, zoom = 12, children }) {
  return (
    // <Flex flex={1}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: GMAPS_API_KEY }}
      defaultCenter={center}
      defaultZoom={13}
      hoverDistance={20}
    // {...(onClick && { onClick: onClick })}
    >
      {children}
      {/* {children} */}
    </GoogleMapReact>
    // </Flex>
  )
}

export default GoogleMaps
