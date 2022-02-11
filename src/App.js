import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import SignUp from './components/sign-up'
import Management from './components/management'
import SignIn from './components/authentication/sign-in'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalLinearStepper from './components/registration-form-stepper'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <div className="App">
      {/* <Management/> */}
      {isAuthenticated 
      ? <Management/> 
      : (
      <Router> 
        <Routes>
          <Route path = "/" element={<SignIn/>}/>
          <Route path = "/sign-up" element={<HorizontalLinearStepper/>}/>
        </Routes>
      </Router>
      )}
    </div>
  );
}

export default App;
