import React from 'react';

function Step2(props) {
    const parse = require('html-react-parser').default;
    const food = props.food
    const summ = food.summary ? parse(food.summary) : null;
    const instructions=food.instructions ? parse(food.instructions):null;
    
    

    return (
        <>
        <div className='step-cont'>
            <h1>{food.title}</h1>
            <div className="recipe-cont">
                <img src={food.image} alt="" className='recipe-img' />
                <div className="summary">
                    <h2>Summary</h2>
                    {summ}
                </div>
            </div>
            <div className="ins-ing">
                <div className="instruct">
                    <h3>Instructions</h3>
                    <div className="inst">
                        {instructions}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Step2
