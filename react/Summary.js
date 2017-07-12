import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Summary extends Component {
  render () {
    const {ingredients, steps, title} = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <p>
          <span>{ingredients} Ingredients</span> | <span>{steps} Steps</span>
        </p>
      </div>
    );
  }
}

Summary.propTypes = {
  ingredients: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  title: PropTypes.string
}

Summary.defaultProps = {
  ingredients: 0,
  steps: 0,
  title: '[recipe]'
}
