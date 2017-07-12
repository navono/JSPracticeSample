import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Star from './Star'

// 需要将 StarRating 做成一个 呈现组件 （Presentational components）
// 呈现组件 的意思是内部不保存任何状态，它所做的只是通过props接收数据，然后修改
// 最后通过回调传给父组件


const PureStarRating = ({starsSelected = 0, totalStars = 5, onRate = f => f}) =>
  <div className="star-rating">
    {[...Array(totalStars)].map((n, i) => 
      <Star key={i}
        selected={i<starsSelected}
        onClick={() => onRate(i +1)}
      />)}
    <p>{starsSelected} of {totalStars} stars</p>
  </div>

class StarRating extends Component {
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

export { PureStarRating, StarRating as default }
