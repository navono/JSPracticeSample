import React, {Component} from 'react';
import PropTypes from 'prop-types';

// CLASS STATIC PROPERTIES

const Summary = ({title = '[recipe]', ingredients = 0, steps = 0}) => {
  console.log('Summary');
  return (
    <div>
      <h1>{title}</h1>
      <p>
        <span>{ingredients} Ingredients</span> | <span>{steps} Steps</span>
      </p>
    </div>
  );
}

// Summary.propTypes = {
//   ingredients: PropTypes.number.isRequired,
//   steps: PropTypes.number.isRequired,
//   title: PropTypes.string
// }

// Summary.defaultProps = {
//   ingredients: 0,
//   steps: 0,
//   title: '[recipe]'
// }

export default Summary;
