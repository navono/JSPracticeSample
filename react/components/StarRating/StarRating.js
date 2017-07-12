import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Star from './Star'

export default class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starsSelected: props.starsSelected || 0
    }

    this.change = this.change.bind(this);
  }

  change(starsSelected) {
    this.setState({starsSelected});
  }

  // 在VDOM刷新前
  componetWillMount() {
    const {starsSelected} = this.props;
    if (starsSelected) {
      this.setState({starsSelected});
    }
  }

  // 在组件的props更新后
  // componentWillRecieveProps

  render() {
    const {totalStars} = this.props;
    const {starsSelected} = this.state;
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => 
          <Star key={i}
            selected={i<starsSelected}
            onClick={() => this.change(i +1)}
          />)}
        <p>{starsSelected} of {totalStars} stars</p>
      </div>
    );
  }
}

StarRating.propTypes = {
  totalStars: PropTypes.number
}

StarRating.defaultProps = {
  totalStars: 5
}
