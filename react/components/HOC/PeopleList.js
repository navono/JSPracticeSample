import React from 'react';
import DataComponent from './DataComponent'

const PeopleList = ({data}) => {
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
