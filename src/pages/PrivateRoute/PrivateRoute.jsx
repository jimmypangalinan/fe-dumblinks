import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'


import { UserContextToken } from '../../context/useContext'

function PrivateRoute() {

    const [state] = useContext(UserContextToken);
    console.log(state);

  return (
    state.isLogin? <Outlet/> : <Navigate to = '/check-auth' />
  )
}

export default PrivateRoute