import React from 'react';
import GoogleMapReact from 'google-map-react'
const mapCenter = {
  lat: 52.2297,
  lng: 21.0122,
}

const GMAPS_API_KEY = '';
//   process.env.NODE_ENV === 'development'
//     ? ''
//     : 'AIzaSyBvOx1C-1391jXAOK18AkTShA9Lxh0dEMY'

function GoogleMaps({ center = mapCenter, zoom = 12, children }) {
  return (
    // <Flex flex={1}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={10}
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
