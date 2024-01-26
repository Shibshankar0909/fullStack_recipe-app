import React from 'react';
import Pop from './pop';
import { useNavigate,useLocation } from 'react-router-dom';
import SkeletonCard from './skeletonCard';

function Popular(props) {
  const [loading,setLoading]=React.useState(true);
  const category=props.selectedCategory;
  let heading="";
  let url="";
  if(category==='breakfast'){
    heading='Breakfast';
    url='/category?category=Breakfast';
  }else if(category==='lunch'){
    heading='Lunch';
    url='/category?category=Lunch';
  }else if(category==='dinner'){
    heading='Dinner';
    url='/category?category=Dinner';
  }
  const location=useLocation();
  const navigate=useNavigate();
  const [userId,setUserId]=React.useState("");
  const [pop, setPop] = React.useState([]);
  

  
  React.useEffect(()=>{
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
    getUser_Id();
  },[])

  React.useEffect(() => {
    const getPopular = async () => {
      try {
          const api = await fetch(`http://localhost:5000/api/recipe${url}`, {
            method: 'GET',
            credentials: 'include',
          });
          console.log("called")
    
          const data = await api.json();
          if(api.status==401){
            navigate('/', { state: { from: location }, replace: true });
          }
          
          if (api.ok) {
            setLoading(false);
            console.log('ok')
            setPop(data.recipes);
          } else {
            console.error('Error fetching data:', data.message);
          }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getPopular();
  }, [category]);
  const disp = pop.map((food) => {
    return <Pop favFood={props.favFood} setFavFood={props.setFavFood} pop={pop} key={food._id} popFood={food} userId={userId} />
})


  return (
    <div className='pop-cont'>
      <h2>Our Top {heading} Picks</h2>
      <div className='popular'>
        {loading && <><SkeletonCard/><SkeletonCard/><SkeletonCard/><SkeletonCard/><SkeletonCard/></>}
        {disp}
      </div>
    </div>
  )
}

export default Popular
