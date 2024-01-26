import React from 'react';
import Step2 from './Step2';
import { Link,useNavigate,useLocation } from 'react-router-dom';
function Instructions(props) {
    const location = useLocation ();
    const navigate = useNavigate();
    const id=location.state
    const [Instruct,setInstruct]=React.useState([])
    const getInstruct = async () => {
      try {
          const api = await fetch(`http://localhost:5000/api/recipe/getId/?id=${id}`, {
            method: 'GET',
            credentials:'include',
        });
        if((api.status==401)){
          navigate('/', { state: { from: location }, replace: true });
        }
          const data = await api.json();
          console.log(id);
          setInstruct(data.recipes);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
};
    React.useEffect(()=>{
        getInstruct();
    },[id])
  return (
    <div>
      <Step2 food={Instruct}/>
    </div>
  )
}

export default Instructions
