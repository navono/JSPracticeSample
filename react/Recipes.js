import React, {Component} from 'react';

import IngredientList from './IngredientsList';
import Instructions from './Instructions';

// A stateless functional component for an individual Recipe
const Recipe = ({name, ingredients, steps}) =>
  <section id={name.toLowerCase().replace(/ /g, '-')}>
    <h1>{name}</h1>
    <IngredientList list={ingredients} />
    <Instructions title="Cooking Instructions"
      steps={steps}
    />
  </section>

export default Recipe;
