import React from 'react';
import DataComponent from './DataComponent'

const PeopleList = ({data}) => {

  let testA = {
    a: 1,
    b: {
      b1: 2,
      b2: {
        b3:3
      }
    }
  }

  let ccc = {...testA, b: {b2: {b3: 5}}};
  console.log(ccc);
  ccc.b.b1 = 5;
  
  // let ddd = Object.assign({}, testA, {b: {b1: 3, b2: {b3: 5}}});
  // console.log(ddd);

  console.log(testA);

  return (
    <ol className="people-list">
      {data.results.map((person, i) => {
        const {first, last} = person.name;
        return <li key={i}>{first} {last}</li>
      })}
    </ol>
  )
};

// higher-order component

const RandomMeUsers = DataComponent(
  PeopleList,
  'https://api.randomuser.me/?nat=US&results=5'
);

export default RandomMeUsers;
