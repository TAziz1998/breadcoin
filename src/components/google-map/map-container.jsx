import * as React from 'react';
import GoogleMaps from './googleMaps';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import BakeryDiningRoundedIcon from '@mui/icons-material/BakeryDiningRounded';
import './google-maps.scss'

export default function MapContainer() {


    const [open, setOpen] = React.useState(true);
  
    const locations = [[52.1942, 52.1942], [52.2409, 20.9113], [52.1379, 21.0291], [52.4783, 21.6320]]
    const handleClick = () => {
      setOpen(!open);
    };
  
      return (
       <>
       <GoogleMaps>
         {locations.map(location => {
           return(
            //  <div className='google-maps-location-icon'>
            <LocationOnIcon
            className="google-maps-location-icon"
            color="primary"
            //  key={index}
            //  onClick={() => handleCategoryClick(offers.length, id)}
            fontSize='large'
             lat={location[0]}
             lng={location[1]}
             
         />
        //  </div>
         )
         })}
       </GoogleMaps>
       </>
      );
  }