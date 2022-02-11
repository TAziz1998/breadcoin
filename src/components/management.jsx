import React,{useEffect} from 'react';
import SideBar from './sidebar'
import Balance from './contents/balance';
import TransactionHistory from './contents/transaction-history'
import MapContainer from './google-map/map-container';
import EditProfile from './edit-profile';
import Login from './login'
import Regulations from '../regulations'
import BreadcoinTransfer from './breadcoin-transfer'
import BreadcoinReceive from './breadcoin-receive'
import BreadcoinTransferStepper from './breadcoin-transfer-stepper' 
import './management.scss'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux'


  import { getUserDetails, getBalance }  from '../redux/reducers/user'

export default function Management() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const userData = useSelector((state) => state.user.userData)
  const userDetails = useSelector((state) => state.user.userDetails)

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

    useEffect(() => {
    // if(token) {
        dispatch(getUserDetails(userData))
    // }
  }, [])

  console.log(userData);
    return (
     <main className="management-container">
         <Router>
         <aside className="side-bar">
             <SideBar/>
         </aside> 
         <section className="content">
             
                 <Routes>
                     <Route path = "/balance" element={<Balance userData={userData}/>}/>
                     <Route path = "/login" element={<Login/>}/>
                     <Route path = "/transaction-history" element={<TransactionHistory userData={userData}/>}/>
                     <Route path = "/breadcoin-transfer" element={<BreadcoinTransfer userData={userData}/>}/>
                     <Route path = "/breadcoin-receive" element={<BreadcoinTransferStepper userData={userData}/>}/>
                     <Route path = "/selling-points" element={<MapContainer/>}/>
                     <Route path = "/edit-profile" element={<EditProfile userData={userData} userDetails={userDetails}/>}/>
                     <Route path = "/regulations" element={<Regulations/>}/>
                     {/* <Route path = "/edit-profile" element={<EditProfile/>}/> */}
                 </Routes>
        </section>
        </Router>
    </main>
    );
}