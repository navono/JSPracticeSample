import React, {Component} from 'react';

import IngredientList from './IngredientsList';
import Instructions from './Instructions';
import Summary from './Summary'

// A stateless functional component for an individual Recipe
const Recipe = ({name, ingredients, steps}) =>
  <section id={name.toLowerCase().replace(/ /g, '-')}>
    <Summary title={name} ingredients={ingredients.length} steps={steps.length}/>
    <IngredientList list={ingredients} />
    <Instructions title="Cooking Instructions"
      steps={steps}
    />
  </section>

export default Recipe;
