import React, {Component} from 'react';
import Recipe from './Recipes';

// A stateless functional component for the Menu of Recipes
const Menu = ({recipes}) => {
  console.log('Menu');
  return (<article>
    <header>
      <h1>Delicious Recipes</h1>
    </header>
    <div className="recipes">
      {recipes.map((recipe, i) => (
        <Recipe key={i} {...recipe} />
      ))}
    </div>
  </article>
  );
}

export default Menu;
