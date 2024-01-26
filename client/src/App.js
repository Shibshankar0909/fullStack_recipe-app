import './App.css';
import React from "react";
import HomePage from "./pages/HomePage"
import {Route, Routes} from "react-router-dom"
import SignupForm from './pages/signupForm';
import LoginForm from './pages/loginForm';


function App() {
  const [favFood,setFavFood]=React.useState([])
    const check=sessionStorage.getItem("favList")
    React.useEffect(()=>{
        if(check){
            setFavFood(JSON.parse(check))
        }
    },[])
  return (
        //<BrowserRouter basename="recipe-app">
        <>
        <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/' element={<SignupForm/>}/>
        <Route path="/home/*" element={<HomePage favFood={favFood} setFavFood={setFavFood}/>}/> 
        </Routes>
        </>
  )
}

export default App

