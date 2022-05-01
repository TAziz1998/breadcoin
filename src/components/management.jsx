import React, { useEffect } from 'react'
import SideBar from './sidebar'
import Balance from './contents/balance'
import TransactionHistory from './contents/transaction-history'
import MapContainer from './google-map/map-container'
import EditProfile from './edit-profile'
import Login from './login'
import Regulations from '../regulations'
import BreadcoinReceive from './breadcoin-receive'
import BreadcoinTransferStepper from './breadcoin-transfer-stepper'
import BreadcoinShop from './breadcoin-shop'
import './management.scss'
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

// import PrivateRoute from './private-route'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar'
import { getUserDetails, getBalance } from '../redux/reducers/user'

export default function Management() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const userData = useSelector((state) => state.user.userData)
  const userDetails = useSelector((state) => state.user.userDetails)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    // if(token) {
    dispatch(getUserDetails(userData))
    // }
  }, [])

  console.log(userData)
  return (
    <>
      <Navbar />
      <main className="management-container">
        <Router>
          <aside className="side-bar">
            <SideBar />
          </aside>
          <section className="content">
            <Routes>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      isAuthenticated ?
                      <Navigate to="/balance" /> :
                      <Navigate to="/sign-in" /> 
                    )
                }}
              />
              <Route path="/balance" element={<Balance userData={userData} />} />
              <Route
                path="/transaction-history"
                element={<TransactionHistory userData={userData} />}
              />
              <Route
                path="/breadcoin-receive"
                element={<BreadcoinReceive userData={userData} />}
              />
              <Route
                path="/breadcoin-transfer"
                element={<BreadcoinTransferStepper userData={userData} />}
              />
              <Route path="/selling-points" element={<MapContainer userData={userData}/>} />
              <Route path="/breadcoin-shop" element={<BreadcoinShop/>} />
              <Route
                path="/edit-profile"
                element={
                  <EditProfile userData={userData} userDetails={userDetails} />
                }
              />
              <Route path="/regulations" element={<Regulations />} />
              {/* <Route path = "/edit-profile" element={<EditProfile/>}/> */}
            </Routes>
          </section>
        </Router>
      </main>
    </>
  )
}
