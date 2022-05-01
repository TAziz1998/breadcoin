import React, {useEffect} from 'react';
import GoogleMaps from './googleMaps';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
// import BakeryDiningRoundedIcon from '@mui/icons-material/BakeryDiningRounded';
import './google-maps.scss'
import { getShopsInformation }  from '../../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import Geocode from "react-geocode";

const GMAPS_API_KEY = 'AIzaSyBEn3ztSDotuikxV2LZPBz8bmGgQ0Tikm4'

Geocode.setApiKey(GMAPS_API_KEY);

export default function MapContainer({userData}) {
  const shops = useSelector((state) => state.user.shops)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);
  
    useEffect(() => {
      dispatch(getShopsInformation(userData))
    }, [])

    const locations = [[52.1942, 52.1942], [52.2409, 20.9113], [52.1379, 21.0291], [52.4783, 21.6320]]
    const handleClick = () => {
      setOpen(!open);
    };
  
      return (
       <>
       <GoogleMaps>
         {shops.map(shop => {
           return(
            //  <div className='google-maps-location-icon'>
            <StorefrontIcon
            className="google-maps-location-icon"
            // color="primary"
            //  key={index}
            //  onClick={() => handleCategoryClick(offers.length, id)}
            fontSize='medium'
             lat={shop.latitude}
             lng={shop.longitude}
             
         />
        //  </div>
         )
         })}
       </GoogleMaps>
       </>
      );
  }