import React from 'react'
import Pop from './pop';

function Veg(props) {
  const [veg, setVeg] = React.useState([])

  const getVeg = async () => {
    const check=sessionStorage.getItem("veg")
    if(check){
      setVeg(JSON.parse(check))
    }else{
      try {
        const api = await fetch('https://api.spoonacular.com/recipes/random?apiKey=c9f3f1aec28945ee802b927bb274d46a&number=5&tags=vegetarian');
        const data = await api.json();
        sessionStorage.setItem("veg",JSON.stringify(data.recipes))
        setVeg(data.recipes);
        console.log("called");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  }; 
  React.useEffect(() => {
    getVeg();
  }, []);

  const disp = veg.map((food) => {
    return <Pop favFood={props.favFood} setFavFood={props.setFavFood} pop={veg} key={food.id} popFood={food}/>

})


  return (
    <div className='pop-cont'>
    <h2>Our Top Veg Picks</h2>
    <div className='popular'>
      {disp}
    </div>
    </div>
  )
}

export default Veg
