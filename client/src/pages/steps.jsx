import React from 'react'
import parse from 'html-react-parser';
import {useLocation } from 'react-router-dom'
function Steps(props) {
  const parse = require('html-react-parser').default;
  const location = useLocation();
  const food = location.state;
  console.log(food)
  const ingd=food.extendedIngredients
  const ingdList=ingd.map((item) => {
    return <li>{item.original}</li>
  })

  const summ =parse(food.summary)

  return (
    <div className='step-cont'>
      <h1>{food.title}</h1>
      <div className="recipe-cont">
        <img src={food.image} alt="" className='recipe-img'/>
        <div className="summary">{summ}</div>
      </div>
      <div className="ins-ing">
        <div className="ingdList">
          <h3>Ingredients</h3>
          <ul>
            {ingdList}
          </ul>
        </div>
        <div className="instruct">
          <h3>Instructions</h3>
          <div className="inst">
            {food.instructions}
          </div>
        </div>
        </div>
    </div>
  )
}

export default Steps
