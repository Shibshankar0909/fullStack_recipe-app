import React from 'react';
import Popular from "../components/popular";
function MainPage(props) {
  const getStateFromSessionStorage = () => {
    const state = sessionStorage.getItem('category');
    return state ? state : 'all';
  };

  const [selectedCategory, setSelectedCategory] = React.useState(getStateFromSessionStorage);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    sessionStorage.setItem('category', newCategory);
    setSelectedCategory(newCategory);
  };
  return (
    <div className="MainPage">
      <div className="dropdown-container">
      <label htmlFor="category">Select a category:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      </div>
      <Popular selectedCategory={selectedCategory} />
    </div>
  )
}

export default MainPage
