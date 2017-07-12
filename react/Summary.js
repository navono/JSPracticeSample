import React, {Component} from 'react';
import PropTypes from 'prop-types';

// CLASS STATIC PROPERTIES

// 改成默认值，对于外界传入不同类型的值，也会失去属性验证
// 因此，如果需要属性验证，最好还是用PropTypes
const Summary = ({title = '[recipe]', ingredients = 0, steps = 0}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        <span>{ingredients} Ingredients</span> | <span>{steps} Steps</span>
      </p>
    </div>
  );
}

export default Summary;
