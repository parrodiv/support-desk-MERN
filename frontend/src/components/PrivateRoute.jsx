import {Navigate, Outlet} from 'react-router-dom'
// Outlet allow us to render child routes or child element such as Children
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner'


const PrivateRoute = () => {
  const {loggedIn, checkingStatus} = useAuthStatus()

 if(checkingStatus){
   return <Spinner /> 
 }

 return loggedIn ? <Outlet /> : <Navigate to='/login' /> 
}

export default PrivateRoute
