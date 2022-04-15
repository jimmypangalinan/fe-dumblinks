import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// styling
import './App.css';

// pages
import Landing_Page from './pages/Landing_Page';
import Dasboard from './pages/Dasboard';
import Create_Link from './pages/Create_Link2';
// import Create_Link from './pages/Create_Link';
import Edit_Link from './pages/Edit_Link';
import Account from './pages/Account';
import Links from './pages/Links';
import Preview from './pages/Preview';
import Publish from './pages/Publish';

// API
import { API, setAuthToken } from "./config/api";

// useComtext
import { UserContextToken } from "./context/useContext";

// private-route
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContextToken);

  console.log(state.isLogin);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (!state.isLogin) {
      navigate("/");
    } else {
      navigate("/dasboard");
    }
    
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // data user
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      // send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

    } catch (error) {
      console.log(error);
      return dispatch({
        type: "AUTH_ERROR",
      });
      
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
    <Routes>
      <Route exact path="/" element={<Landing_Page />} />
      <Route exact path="/:id" element={<Publish />} />
      <Route exact path="/dasboard" element={<Dasboard />} />
        <Route exact path="/create-link" element={<Create_Link />} />
        <Route exact path="/edit-link/:id" element={<Edit_Link />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/links" element={<Links />} />
        <Route exact path="/preview/:id" element={<Preview />} />

      {/* <Route exact path='/' element={<PrivateRoute/>}>
        <Route exact path="/dasboard" element={<Dasboard />} />
        <Route exact path="/create-link" element={<Create_Link />} />
        <Route exact path="/edit-link/:id" element={<Edit_Link />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/links" element={<Links />} />
        <Route exact path="/preview/:id" element={<Preview />} />
      </Route> */}
    </Routes>
  );
}

export default App;
