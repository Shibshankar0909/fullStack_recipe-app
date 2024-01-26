import React from 'react';
import Pop from './pop';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import SkeletonCard from './skeletonCard';

function Pop2(props) {
    const [loading,setLoading]=React.useState(true); 
    const id=props.id;
    console.log(id);
    const userId=props.userId;
    const location=useLocation();
    const navigate=useNavigate();
    const [pop, setPop] = React.useState([]);
    const [deleted,setDeleted]=React.useState(false);

    const getPopular = async () => {
        try {
            const api = await fetch(`http://localhost:5000/api/recipe/getId/?id=${id}`, {
              method: 'GET',
              credentials: 'include',
            });
      
            const data = await api.json();
            if(api.status==401){
              navigate('/', { state: { from: location }, replace: true });
            }
            console.log(data);
            if (api.ok) {
              setLoading(false);
              setPop(data.recipes);
            } else {
              console.error('Error fetching data:', data.message);
            }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

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
                    recipeId:pop._id
                })
              });
              if(response.status==401){
                navigate('/', { state: { from: location }, replace: true });
              }
              if(response.ok){
                setDeleted(true);
                sessionStorage.removeItem(JSON.stringify(pop._id));
                // setClicked(prevClicked=>!prevClicked);
              }
        } catch (error) {
            console.log(error);
        }
    }
      
      React.useEffect(() => {
        getPopular();
      }, []);


    
      return deleted? null:(
        <>
        {loading && <><SkeletonCard/></>}
        <div className='food' >
                <div className="food-box">
                <img src={pop.image}></img>
                <div className='fav' style={{ color: "red"}} >
                    <div onClick={removeItem} className="fav-btn">
                    {"Remove From Favorites" }
                    </div>
                    <Link to={'/home/instructions'} className="step-btn" state={pop._id}>
                        Show Recipe
                    </Link>

                </div>
                </div>
            <div style={{ color: "red"  }} className='text'>{pop.title}</div>
            </div>
        </>
      )
}

export default Pop2
