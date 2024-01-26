import React from 'react';
import Pop2 from './pop2'
import { useNavigate,useLocation } from 'react-router-dom';

function Fav(props) {
  const location=useLocation();
  const navigate=useNavigate();
  const [userId,setUserId]=React.useState("");
  const [id, setId] = React.useState([]);
  const getUser_Id=async ()=>{
    try {
      const response= await fetch('http://localhost:5000/api/user/getUser_Id',{
        method:'GET',
        credentials:'include'
      });
      const data = await response.json();
      setUserId(data.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  const getFavId = async () => {
    try {
      console.log('id',userId);
        const api = await fetch(`http://localhost:5000/api/favorites/?userId=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await api.json();
        if(api.status==401){
          navigate('/', { state: { from: location }, replace: true });
        }
        console.log(data.favorites);
        
        if (api.ok) {
          setId(data.favorites);
        } else {
          console.error('Error fetching data:', data.message);
        }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  React.useEffect(() => {
    getUser_Id();
  }, []);

  React.useEffect(() => {
    if (userId) {
      getFavId();
    }
  }, [userId]);

  const disp = id && id.length === 0 ? "Add Your Favorite Recipes Here":id.map((food) => {
    return <Pop2 id={food.recipe} userId={userId} />
})


  return (
    <div className='pop-cont'>
      <h2>Your Fav Picks</h2>
      <div className='popular'>
        {disp}
      </div>
    </div>
  )
}

export default Fav
