import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'


import { UserContext } from '../../context/useContext'

function PrivateRoute() {

    const [state] = useContext(UserContext);

  return (
    state.isLogin? <Outlet/> : <Navigate to = '/check-auth' />
  )
}

export default PrivateRoute