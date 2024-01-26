import React from "react";
import Search from './search';
import Searched from "./searched";
import Instructions from "./Instructions";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Fav from "../components/Fav";
import { Link,useNavigate,useLocation } from 'react-router-dom';

const HomePage = (props) => {
    const location = useLocation ();
    const navigate = useNavigate();
    const checkOpt = JSON.parse(sessionStorage.getItem("selectedOption"));
    const opt =location.pathname=='/home/fav' ? 'fav' : 'home';
    const [selectedOption, setSelectedOption] = React.useState(opt);
    const logout= async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/user/logout', {
              method: 'GET',
              credentials:'include',
            });
            console.log(response.status);
            if (response.status===200) {
              console.log('User logged out successfully!');
              navigate('/');
            } else {
              console.error('Error logging out:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error.message);
          }
    }
    const favFood=props.favFood;
    const setFavFood=props.setFavFood;
    const handleClick1=()=>{
        navigate('/home', { state: { from: location }, replace: true });
        setSelectedOption('home')
    }
    const handleClick2=()=>{
        navigate('/home/fav', { state: { from: location }, replace: true });
        setSelectedOption('fav')
    }
    React.useEffect(()=>{
        sessionStorage.setItem("selectedOption",JSON.stringify(selectedOption))
    },[selectedOption])

    return (
        <div className="homePage">
        <Search/>
        <div className="log-option" onClick={logout}>
            LogOut
        </div>
            
        <div className="navbar">
                <div
                    className={`nav-option ${selectedOption === 'home' ? 'selected' : ''}`}
                    onClick={handleClick1}
                >
                    Home
                </div>
                <div
                    className={`nav-option ${selectedOption === 'fav' ? 'selected' : ''}`}
                    onClick={handleClick2}
                >
                    Favorites
                </div>
         </div>

        <Routes>   
        <Route path="/" element={<MainPage  favFood={favFood} setFavFood={setFavFood}/>} />
        <Route path='/instructions' element={<Instructions/>}/>
        <Route path='/searched/:search' element={<Searched favFood={favFood} setFavFood={setFavFood}/>}/>
        <Route path="/fav" element={<Fav className="favPg"/> } />
        </Routes>
        </div>
    )
}
export default HomePage