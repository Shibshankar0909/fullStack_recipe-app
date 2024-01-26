import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Pop = (props) => {
    const location=useLocation();
    const navigate = useNavigate();
    const food = props.popFood;
    const userId=props.userId;
    const recipeId=food._id;
    const[clicked,setClicked]=React.useState(false);
    const getInitialClickedState = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/check?userId=${userId}&recipeId=${food._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.status==401){
          navigate('/', { state: { from: location }, replace: true });
        }

        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const updateInitialClickedState = async () => {
      try {
        const initialClickedState = await getInitialClickedState();
        setClicked(initialClickedState);
      } catch (error) {
        console.log(error);
      }
    };

    const addItem= async()=> {
        try {
            const response = await fetch('http://localhost:5000/api/favorites/add', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId:userId,
                    recipeId:food._id
                })
              });  
              if(response.status==401){
                navigate('/', { state: { from: location }, replace: true });
              }
              if(response.ok){
                sessionStorage.setItem(JSON.stringify(recipeId),JSON.stringify(recipeId));
                setClicked(prevClicked=>!prevClicked);
              }
              
        } catch (error) {
            console.log(error);
        }

    }


    const removeItem= async()=> {
        try {
            const response = await fetch('http://localhost:5000/api/favorites/remove', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId:userId,
                    recipeId:food._id
                })
              });
              if(response.status==401){
                navigate('/', { state: { from: location }, replace: true });
              }
              if(response.ok){
                sessionStorage.removeItem(JSON.stringify(recipeId));
                setClicked(prevClicked=>!prevClicked);
              }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(()=>{
      updateInitialClickedState();
      const value=sessionStorage.getItem(JSON.stringify(recipeId));
      setClicked(value);
    },[])

    return (
            <div className='food' >
                <div className="food-box">
                <img src={food.image}></img>
                <div className='fav' style={{ color: clicked ? "red" : "black" }} >
                    <div onClick={clicked ? removeItem : addItem} className="fav-btn">
                    {clicked ? "Remove From Favorites" : "Add to Favorites"}
                    </div>
                    <Link to={'/home/instructions'} className="step-btn" state={food._id}>
                        Show Recipe
                    </Link>

                </div>
                </div>
            <div style={{ color: clicked ? "red" : "black" }} className='text'>{food.title}</div>
            </div>
    )
}

export default Pop
