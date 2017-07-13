import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { PureStarRating } from '../StarRating/StarRating';
import './stylesheets/Color.scss';

// const Color = ({title, color, rating = 0, onRemove = f => f, onRate = f => f}) =>
//   <section className="color">
//     <h1>{title}</h1>
//     <button onClick={onRemove}>X</button>
//     <div className="color"
//       style={{backgroundColor: color}}>
//     </div>
//     <div>
//       <PureStarRating starsSelected={rating}onRate={onRate}/>
//     </div>
//   </section>

class Color extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.style = { backgroundColor: '#CCC' };
  }

  // 接收到 state，判断是否需要更新
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.rating !== nextProps.rating;
  }

  // 接收到 state 更新后且应该更新后才调用
  componentWillUpdate(nextProps, nextState) {
    const { title, rating } = this.props;
    this.style = null;

    this.refs.title.style.backgroundColor = 'red';
    this.refs.title.style.color = 'white';
    alert(`${title}: rating ${rating} -> ${nextProps.rating}`);
  }

  componentDidUpdate(prevProps, prevState) {
    const { title, rating } = this.props;
    const status = (rating > prevProps.rating) ? 'better' : 'worse';

    this.refs.title.style.backgroundColor = '';
    this.refs.title.style.color = 'black';
  }

  render() {
    const { title, rating, color, onRate, onRemove } = this.props;
    return (
      <section className="color" style={this.style}>
        <h1 ref="title">{title}</h1>
        <button onClick={onRemove}>X</button>
        <div className="color"
          style={{backgroundColor: color}}>
        </div>
        <div>
          <PureStarRating starsSelected={rating}onRate={onRate}/>
        </div>
      </section>
    );
  }
}

Color.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number,
  onRemove: PropTypes.func,
  onRate: PropTypes.func
}

Color.defaultProps = {
  title: undefined,
  color: '#000000',
  rating: 0,
  onRemove: f=>f,
  onRate: f=>f
}

export default Color;
